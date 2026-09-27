/**
 * Bravo University course catalog.
 *
 * Adding a course: append an entry here. The catalog page groups courses by
 * level, derived from the first digit of the course number, so a new 200- or
 * 300-level course creates its group automatically.
 */

export type Course = {
  /** Course number. The first digit selects the level group. */
  number: string
  title: string
  blurb: string
  /** Published page for the course. */
  href: string
  /** Rough time to complete, shown on the card. Optional. */
  duration?: string
}

export const COURSES: Course[] = [
  {
    number: "101",
    title: "Setting Up a New Account",
    blurb: "From registration to a ready-to-talk device, step by step.",
    href: "/bravo-university/101/",
  },
]

export const LEVELS: Record<string, { name: string; description: string }> = {
  "1": {
    name: "100 Level",
    description: "Getting started: setup, the basics, and your first conversations.",
  },
  "2": {
    name: "200 Level",
    description: "Going further: customizing Bravo around the person using it.",
  },
  "3": {
    name: "300 Level",
    description: "Advanced: fine-tuning, administration, and troubleshooting.",
  },
}

/** Courses grouped by level, in course-number order, skipping empty levels. */
export function coursesByLevel(): { key: string; name: string; description: string; courses: Course[] }[] {
  const sorted = [...COURSES].sort((a, b) => a.number.localeCompare(b.number, undefined, { numeric: true }))
  const keys = Array.from(new Set(sorted.map((c) => c.number[0]))).sort()

  return keys.map((key) => ({
    key,
    name: LEVELS[key]?.name ?? `${key}00 Level`,
    description: LEVELS[key]?.description ?? "",
    courses: sorted.filter((c) => c.number[0] === key),
  }))
}
