"use client";

import { Suspense, useMemo, useState, useSyncExternalStore } from "react";
import type { DayButtonProps } from "react-day-picker";
import { CalendarPlusIcon, ClockIcon, MapPinIcon } from "lucide-react";
import { AnimatedContent } from "@/components/animated-content";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { siteConfig } from "@/config/site";
import type { CalendarEvent } from "@/lib/calendar";
import { TIME_ZONE, dayKey } from "@/lib/dates";

const UPCOMING_LIMIT = 8;

const calendars = new Map(siteConfig.calendars.map((c) => [c.id, c]));

const timeFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  hour: "numeric",
  minute: "2-digit",
});
const longDayFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  weekday: "long",
  month: "long",
  day: "numeric",
});
const shortDayFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  weekday: "short",
  month: "short",
  day: "numeric",
});

/** Midnight Arizona time on a YYYY-MM-DD day. */
// Arizona doesn't observe DST, so the offset is fixed. (TZDate's constructor
// reads the clock, which breaks prerendering.)
function keyToDate(key: string): Date {
  return new Date(`${key}T00:00:00-07:00`);
}

function timeLabel(event: CalendarEvent): string {
  if (event.allDay) return "All day";
  return `${timeFormat.format(new Date(event.start))} – ${timeFormat.format(new Date(event.end))}`;
}

// Reading the clock during prerender is an error under Cache Components, so
// the server render uses the day the events were fetched and the client
// switches to the real date after hydrating.
const noSubscribe = () => () => {};
function useToday(fetchedOn: string): string {
  return useSyncExternalStore(
    noSubscribe,
    () => dayKey(new Date()),
    () => fetchedOn,
  );
}

export function EventsView({
  events,
  fetchedOn,
}: {
  events: CalendarEvent[];
  fetchedOn: string;
}) {
  const today = useToday(fetchedOn);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [month, setMonth] = useState<Date | null>(null);

  const eventsByDay = useMemo(() => {
    const byDay = new Map<string, CalendarEvent[]>();
    for (const event of events) {
      for (const day of event.days) {
        byDay.set(day, [...(byDay.get(day) ?? []), event]);
      }
    }
    return byDay;
  }, [events]);

  // One modifier per calendar marking the days it has events, read by
  // EventDayButton to draw the colored dots.
  const modifiers = useMemo(
    () =>
      Object.fromEntries(
        siteConfig.calendars.map((c, i) => [
          `calendar${i}`,
          (date: Date) =>
            eventsByDay.get(dayKey(date))?.some((e) => e.calendarId === c.id) ??
            false,
        ]),
      ),
    [eventsByDay],
  );

  const shown = selectedDay
    ? (eventsByDay.get(selectedDay) ?? [])
    : events.filter((e) => e.days.at(-1)! >= today).slice(0, UPCOMING_LIMIT);

  return (
    <section className="relative z-10 h-full w-full overflow-y-auto">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 lg:flex-row lg:items-start lg:gap-12">
        <div className="flex flex-col items-center gap-6 lg:sticky lg:top-0">
          <h1 className="font-outfit text-4xl font-bold text-primary-alternative">
            Events
          </h1>

          {/* react-day-picker reads the clock while rendering, so the grid
              renders per request instead of in the static shell. */}
          <Suspense
            fallback={
              <div className="aspect-[7/8] w-[19rem] rounded-xl border shadow-sm sm:w-[23rem]" />
            }
          >
            <Calendar
              mode="single"
              timeZone={TIME_ZONE}
              today={keyToDate(today)}
              month={month ?? keyToDate(today)}
              onMonthChange={setMonth}
              selected={selectedDay ? keyToDate(selectedDay) : undefined}
              onSelect={(date) => setSelectedDay(date ? dayKey(date) : null)}
              modifiers={modifiers}
              components={{ DayButton: EventDayButton }}
              className="rounded-xl border p-3 shadow-sm [--cell-size:--spacing(10)] sm:[--cell-size:--spacing(12)]"
            />
          </Suspense>

          <ul className="flex flex-col gap-2 self-stretch font-outfit">
            {siteConfig.calendars.map((c) => (
              <li key={c.id} className="flex items-center gap-2">
                <span className={`size-2.5 rounded-full ${c.dot}`} />
                <span className="flex-1">{c.label}</span>
                <a
                  href={`https://calendar.google.com/calendar/r?cid=${encodeURIComponent(c.id)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary-alternative"
                >
                  <CalendarPlusIcon className="size-4" />
                  Subscribe
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 font-outfit">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 className="text-2xl font-semibold">
              {selectedDay
                ? longDayFormat.format(keyToDate(selectedDay))
                : "Upcoming"}
            </h2>
            {selectedDay && (
              <button
                type="button"
                onClick={() => setSelectedDay(null)}
                className="text-sm text-muted-foreground transition-colors hover:text-primary-alternative"
              >
                Show upcoming
              </button>
            )}
          </div>

          <AnimatedContent uniqueKey={selectedDay ?? "upcoming"}>
            {shown.length === 0 ? (
              <p className="text-muted-foreground">
                {selectedDay
                  ? "Nothing scheduled this day."
                  : "No upcoming events. Check back soon!"}
              </p>
            ) : (
              <ul className="flex flex-col gap-4">
                {shown.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    showDate={!selectedDay}
                  />
                ))}
              </ul>
            )}
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}

function EventDayButton(props: DayButtonProps) {
  const dots = siteConfig.calendars.filter(
    (_, i) => props.modifiers[`calendar${i}`],
  );
  return (
    <CalendarDayButton {...props}>
      {props.children}
      <div className="flex h-1.5 gap-0.5">
        {dots.map((c) => (
          <div key={c.id} className={`size-1.5 rounded-full ${c.dot}`} />
        ))}
      </div>
    </CalendarDayButton>
  );
}

function EventCard({
  event,
  showDate,
}: {
  event: CalendarEvent;
  showDate: boolean;
}) {
  const calendar = calendars.get(event.calendarId);
  return (
    <li className="rounded-xl border p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <span
          className={`mt-2 size-2.5 shrink-0 rounded-full ${calendar?.dot ?? "bg-secondary-alternative"}`}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3 className="text-lg font-semibold">
            {event.url ? (
              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary-alternative"
              >
                {event.title}
              </a>
            ) : (
              event.title
            )}
          </h3>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <ClockIcon className="size-4 shrink-0" />
            {showDate &&
              `${shortDayFormat.format(keyToDate(event.days[0]))} · `}
            {timeLabel(event)}
            {calendar && ` · ${calendar.label}`}
          </p>
          {event.location && (
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPinIcon className="size-4 shrink-0" />
              {event.location}
            </p>
          )}
          {event.description && (
            <p className="mt-1 whitespace-pre-line">{event.description}</p>
          )}
        </div>
      </div>
    </li>
  );
}
