import { useEffect, useRef, useState } from "react"
import { Calendar, Loader2 } from "lucide-react"

const EMBED_SRC = "https://app.cal.com/embed/embed.js"
const RENDER_TIMEOUT_MS = 12000

type CalFn = ((...args: unknown[]) => void) & {
  q?: unknown[][]
  ns?: Record<string, unknown>
  loaded?: boolean
}

/**
 * Install Cal.com's loader stub.
 *
 * embed.js throws "Cal is not defined" unless window.Cal already exists when
 * it runs, so the stub has to be in place first: it queues any calls made
 * before the script arrives and injects the script itself. This mirrors the
 * snippet Cal.com documents.
 */
function ensureCal(): CalFn {
  const w = window as unknown as { Cal?: CalFn }
  if (w.Cal) return w.Cal

  const push = (target: CalFn, args: unknown[]) => {
    target.q = target.q || []
    target.q.push(args)
  }

  const cal = function (...args: unknown[]) {
    const self = w.Cal as CalFn
    if (!self.loaded) {
      self.ns = {}
      self.q = self.q || []
      const script = document.createElement("script")
      script.src = EMBED_SRC
      script.async = true
      document.head.appendChild(script)
      self.loaded = true
    }
    if (args[0] === "init") {
      const api = function (...inner: unknown[]) {
        push(api as CalFn, inner)
      } as CalFn
      api.q = api.q || []
      const namespace = args[1]
      if (typeof namespace === "string") {
        ;(self.ns as Record<string, CalFn>)[namespace] = api
        push(api, args)
      } else {
        push(self, args)
      }
      return
    }
    push(self, args)
  } as CalFn

  w.Cal = cal
  return cal
}

export default function CalEmbed({ calLink }: { calLink: string }) {
  const [state, setState] = useState<"idle" | "loading" | "ready" | "failed">("idle")
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (state !== "loading" || !container.current) return

    const target = container.current
    try {
      const Cal = ensureCal()
      Cal("init", { origin: "https://cal.com" })
      Cal("inline", { elementOrSelector: target, calLink, config: { layout: "month_view" } })
    } catch {
      setState("failed")
      return
    }

    // The queue swallows errors, so success is judged by the iframe appearing
    // rather than by the calls above not throwing.
    const started = Date.now()
    const timer = window.setInterval(() => {
      if (target.querySelector("iframe")) {
        window.clearInterval(timer)
        setState("ready")
      } else if (Date.now() - started > RENDER_TIMEOUT_MS) {
        window.clearInterval(timer)
        setState("failed")
      }
    }, 200)

    return () => window.clearInterval(timer)
  }, [state, calLink])

  if (state === "idle") {
    return (
      <div className="rounded-2xl border-2 border-orange-200 bg-white p-8 text-center shadow-sm">
        <Calendar className="mx-auto h-10 w-10 text-orange-600" />
        <h3 className="mt-4 text-xl font-semibold text-gray-900">See available times</h3>
        <p className="mx-auto mt-3 max-w-xl text-gray-600">
          The calendar is provided by Cal.com. We do not load it until you ask, so nothing is fetched from them unless
          you choose to book.
        </p>
        <button
          type="button"
          onClick={() => setState("loading")}
          className="mt-6 inline-flex h-12 items-center justify-center rounded-lg bg-orange-600 px-8 text-base font-semibold text-white transition-colors hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
        >
          Show the calendar
        </button>
      </div>
    )
  }

  if (state === "failed") {
    return (
      <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900">The calendar could not load here</h3>
        <p className="mx-auto mt-3 max-w-xl text-gray-700">
          You can still book on Cal.com directly, or email{" "}
          <a href="mailto:admin@talkwithbravo.com" className="font-medium text-orange-700 underline underline-offset-4">
            admin@talkwithbravo.com
          </a>{" "}
          with a few times that suit you.
        </p>
        <a
          href={`https://cal.com/${calLink}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex h-12 items-center justify-center rounded-lg bg-orange-600 px-8 text-base font-semibold text-white transition-colors hover:bg-orange-700"
        >
          Open the booking page
        </a>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border-2 border-orange-200 bg-white p-2 shadow-sm sm:p-4">
      {state === "loading" && (
        <p className="flex items-center justify-center gap-3 py-16 text-gray-600">
          <Loader2 className="h-5 w-5 animate-spin text-orange-600" />
          Loading the calendar&hellip;
        </p>
      )}
      <div ref={container} className="min-h-[36rem] w-full" />
    </div>
  )
}
