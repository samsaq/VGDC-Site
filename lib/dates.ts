// The club meets in Arizona, so every date on the site is shown in Arizona
// time regardless of where the visitor is. Shared by server and client code.

export const TIME_ZONE = "America/Phoenix";

const dayFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** The local (Arizona) day a moment falls on, as YYYY-MM-DD. */
export function dayKey(date: Date): string {
  return dayFormat.format(date);
}
