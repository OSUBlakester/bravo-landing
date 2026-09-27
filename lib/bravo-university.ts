/**
 * Bravo University course catalog.
 *
 * The course list is GENERATED. Drop a new export in bravo_university/ and run
 *
 *     python3 scripts/build-bravo-university.py
 *
 * which publishes the deck and rewrites bravo-university-courses.json. A new
 * course then appears on /bravo-university with no edit here.
 *
 * Each card's blurb defaults to the subtitle on the deck's own title slide.
 * To word one differently, add an entry to BLURB_OVERRIDES below.
 */

import generated from "./bravo-university-courses.json"

export type Course = {
  /** Course number. The first digit selects the level group. */
  number: string
  title: string
  blurb: string
  /** Published page for the course. */
  href: string
  /** Number of slides in the deck. */
  slideCount: number
}

/** Hand-written blurbs that replace the subtitle pulled from the deck. */
const BLURB_OVERRIDES: Record<string, string> = {
  "102": "Tap and Scan side by side: how each one works, and how to tell which fits the person using Bravo.",
}

export const COURSES: Course[] = (generated as Course[]).map((course) => ({
  ...course,
  blurb: BLURB_OVERRIDES[course.number] ?? course.blurb,
}))

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
