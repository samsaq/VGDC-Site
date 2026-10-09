import type { Metadata } from "next";
import { getEvents } from "@/lib/calendar";
import { EventsView } from "./events-view";

export const metadata: Metadata = { title: "Events" };

export default async function EventsPage() {
  const { events, today } = await getEvents();
  return <EventsView events={events} fetchedOn={today} />;
}
