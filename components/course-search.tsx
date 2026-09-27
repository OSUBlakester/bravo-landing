import { useEffect, useMemo, useRef, useState } from "react"
import { Search, X, GraduationCap } from "lucide-react"

type IndexedSlide = { n: number; title: string; text: string }
type IndexedCourse = { number: string; title: string; href: string; slides: IndexedSlide[] }

type Hit = {
  course: IndexedCourse
  slide: IndexedSlide
  score: number
}

const SNIPPET_RADIUS = 110
const MAX_RESULTS = 25

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

/** Split text around every term match so matches can be highlighted without dangerouslySetInnerHTML. */
function highlight(text: string, terms: string[]) {
  if (!terms.length) return text
  const re = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "gi")
  const lowered = terms.map((t) => t.toLowerCase())
  return text.split(re).map((part, i) =>
    lowered.includes(part.toLowerCase()) ? (
      <mark key={i} className="rounded bg-orange-200 px-0.5 text-gray-900">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

/** A window of slide text centred on the first term match. */
function snippet(text: string, terms: string[]) {
  const lower = text.toLowerCase()
  let at = -1
  for (const t of terms) {
    const i = lower.indexOf(t.toLowerCase())
    if (i !== -1 && (at === -1 || i < at)) at = i
  }
  if (at === -1) return text.slice(0, SNIPPET_RADIUS * 2) + (text.length > SNIPPET_RADIUS * 2 ? "…" : "")

  const start = Math.max(0, at - SNIPPET_RADIUS)
  const end = Math.min(text.length, at + SNIPPET_RADIUS)
  return (start > 0 ? "…" : "") + text.slice(start, end).trim() + (end < text.length ? "…" : "")
}

export default function CourseSearch() {
  const [index, setIndex] = useState<IndexedCourse[] | null>(null)
  const [failed, setFailed] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let cancelled = false
    fetch("/bravo-university/search-index.json")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data) => {
        if (!cancelled) setIndex(data)
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const terms = useMemo(
    () => query.trim().toLowerCase().split(/\s+/).filter((t) => t.length > 1),
    [query],
  )

  const hits: Hit[] = useMemo(() => {
    if (!index || !terms.length) return []
    const out: Hit[] = []
    for (const course of index) {
      for (const slide of course.slides) {
        const haystack = (slide.title + " " + slide.text).toLowerCase()
        if (!terms.every((t) => haystack.includes(t))) continue
        let score = 0
        for (const t of terms) {
          // substring matches still count, so "scan" finds "scanning",
          // but whole-word matches rank above incidental substrings
          score += haystack.split(t).length - 1
          const whole = haystack.match(new RegExp(`\\b${escapeRegExp(t)}\\b`, "g"))
          if (whole) score += whole.length * 3
          if (slide.title.toLowerCase().includes(t)) score += 5
        }
        out.push({ course, slide, score })
      }
    }
    return out
      .sort((a, b) => b.score - a.score || a.course.number.localeCompare(b.course.number) || a.slide.n - b.slide.n)
      .slice(0, MAX_RESULTS)
  }, [index, terms])

  const searching = terms.length > 0

  return (
    <div className="max-w-2xl mx-auto">
      <label htmlFor="course-search" className="sr-only">
        Search Bravo University courses
      </label>
      <div className="relative">
        <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          id="course-search"
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search all courses — try &ldquo;wake word&rdquo; or &ldquo;scan&rdquo;"
          autoComplete="off"
          className="w-full rounded-full border-2 border-orange-200 bg-white py-3 pl-12 pr-12 text-base text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:border-orange-400 focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("")
              inputRef.current?.focus()
            }}
            aria-label="Clear search"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {failed && (
        <p className="mt-3 text-center text-sm text-gray-500">
          Search is unavailable right now. You can still browse the courses below.
        </p>
      )}

      {searching && (
        <div className="mt-6" aria-live="polite">
          <p className="text-sm text-gray-600">
            {index === null
              ? "Loading…"
              : hits.length === 0
                ? "No matches. Try a different word."
                : `${hits.length}${hits.length === MAX_RESULTS ? "+" : ""} matching ${hits.length === 1 ? "slide" : "slides"}`}
          </p>

          <ul className="mt-4 space-y-3">
            {hits.map((hit) => (
              <li key={`${hit.course.number}-${hit.slide.n}`}>
                <a
                  href={`${hit.course.href}#${hit.slide.n}`}
                  className="block rounded-xl border-2 border-gray-200 bg-white p-4 text-left shadow-sm transition-all hover:border-orange-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                >
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-orange-600">
                    <GraduationCap className="h-4 w-4" />
                    Course {hit.course.number}
                    <span className="text-gray-400">&middot;</span>
                    <span className="text-gray-500 normal-case tracking-normal font-medium">
                      Slide {hit.slide.n}
                    </span>
                  </div>
                  <p className="mt-2 font-semibold text-gray-900">{highlight(hit.slide.title, terms)}</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">{highlight(snippet(hit.slide.text, terms), terms)}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
