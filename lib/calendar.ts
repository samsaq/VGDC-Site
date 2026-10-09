import { cacheLife } from "next/cache";
import { siteConfig } from "@/config/site";
import { dayKey } from "@/lib/dates";

// Events mirrored from the club's public Google Calendars (configured in
// config/site.ts). Unlike CMS content these change without a commit, so the
// result is cached for hours and refreshed in the background.

export interface CalendarEvent {
  id: string;
  title: string;
  /** Id of the calendar in siteConfig.calendars it came from. */
  calendarId: string;
  allDay: boolean;
  /** ISO datetime, or YYYY-MM-DD for all-day events. */
  start: string;
  /** ISO datetime, or YYYY-MM-DD (exclusive) for all-day events. */
  end: string;
  /** Every local day (YYYY-MM-DD) the event covers. */
  days: string[];
  location?: string;
  description?: string;
  url?: string;
}

interface GoogleEvent {
  id: string;
  status?: string;
  summary?: string;
  description?: string;
  location?: string;
  htmlLink?: string;
  start: { date?: string; dateTime?: string };
  end: { date?: string; dateTime?: string };
}

const MAX_DAYS = 14;

/** Days from `first` through `last` inclusive, both YYYY-MM-DD. */
function daysBetween(first: string, last: string): string[] {
  const days: string[] = [];
  const cursor = new Date(`${first}T00:00:00Z`);
  while (days.length < MAX_DAYS) {
    const day = cursor.toISOString().slice(0, 10);
    if (day > last) break;
    days.push(day);
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return days;
}

/** Google descriptions are HTML; keep them as plain text with line breaks. */
function toPlainText(html: string): string {
  return html
    .replace(/<br\s*\/?>|<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}

function toEvent(calendarId: string, e: GoogleEvent): CalendarEvent | null {
  if (e.status === "cancelled") return null;
  const allDay = !e.start.dateTime;
  const start = e.start.dateTime ?? e.start.date;
  const end = e.end.dateTime ?? e.end.date ?? start;
  if (!start || !end) return null;

  const firstDay = allDay ? start : dayKey(new Date(start));
  // All-day ends are exclusive dates; timed ends are exclusive moments.
  const lastDay = allDay
    ? (daysBetween(start, end).at(-2) ?? start)
    : dayKey(new Date(new Date(end).getTime() - 1));

  return {
    id: `${calendarId}:${e.id}`,
    title: e.summary || "Untitled event",
    calendarId,
    allDay,
    start,
    end,
    days: daysBetween(firstDay, lastDay > firstDay ? lastDay : firstDay),
    location: e.location || undefined,
    description: e.description ? toPlainText(e.description) : undefined,
    url: e.htmlLink,
  };
}

async function fetchCalendar(
  calendarId: string,
  apiKey: string,
  timeMin: Date,
  timeMax: Date,
): Promise<CalendarEvent[]> {
  const params = new URLSearchParams({
    key: apiKey,
    // Expand recurring events (weekly meetings) into individual occurrences.
    singleEvents: "true",
    orderBy: "startTime",
    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),
    maxResults: "250",
  });
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`,
  );
  if (!res.ok) {
    console.error(
      `Google Calendar ${calendarId}: ${res.status} ${await res.text()}`,
    );
    return [];
  }
  const data: { items?: GoogleEvent[] } = await res.json();
  return (data.items ?? [])
    .map((e) => toEvent(calendarId, e))
    .filter((e): e is CalendarEvent => e !== null);
}

/**
 * Events from a month ago to six months ahead across every configured
 * calendar, soonest first, plus the local day they were fetched on.
 */
export async function getEvents(): Promise<{
  events: CalendarEvent[];
  today: string;
}> {
  "use cache";
  cacheLife("hours");

  const now = new Date();
  const today = dayKey(now);
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
  if (!apiKey) {
    console.warn("GOOGLE_CALENDAR_API_KEY is not set; /events will be empty.");
    return { events: [], today };
  }

  const timeMin = new Date(now);
  timeMin.setMonth(timeMin.getMonth() - 1);
  const timeMax = new Date(now);
  timeMax.setMonth(timeMax.getMonth() + 6);

  const results = await Promise.all(
    siteConfig.calendars.map((c) =>
      fetchCalendar(c.id, apiKey, timeMin, timeMax),
    ),
  );
  const events = results
    .flat()
    .sort(
      (a, b) =>
        a.days[0].localeCompare(b.days[0]) ||
        Number(b.allDay) - Number(a.allDay) ||
        new Date(a.start).getTime() - new Date(b.start).getTime(),
    );
  return { events, today };
}
