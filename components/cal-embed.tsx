import { useEffect, useRef, useState } from "react"
import { Calendar, Loader2 } from "lucide-react"

/**
 * Cal.com inline booking widget, loaded only when the visitor asks for it.
 *
 * The embed pulls a third-party script and sets its own cookies. The privacy
 * policy is explicit that nothing on Bravo tracks people, so nothing from
 * cal.com is fetched until someone presses the button.
 */
export default function CalEmbed({ calLink }: { calLink: string }) {
  const [state, setState] = useState<"idle" | "loading" | "ready" | "failed">("idle")
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (state !== "loading") return

    const existing = document.querySelector<HTMLScriptElement>("script[data-cal-embed]")
    const script = existing ?? document.createElement("script")

    function mount() {
      const Cal = (window as unknown as { Cal?: (...args: unknown[]) => void }).Cal
      if (!Cal || !container.current) {
        setState("failed")
        return
      }
      Cal("init", { origin: "https://cal.com" })
      Cal("inline", {
        elementOrSelector: container.current,
        calLink,
        config: { layout: "month_view" },
      })
      setState("ready")
    }

    if (existing) {
      mount()
      return
    }

    script.src = "https://app.cal.com/embed/embed.js"
    script.async = true
    script.dataset.calEmbed = "true"
    script.onload = mount
    script.onerror = () => setState("failed")
    document.body.appendChild(script)
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
        <h3 className="text-xl font-semibold text-gray-900">The calendar could not load</h3>
        <p className="mx-auto mt-3 max-w-xl text-gray-700">
          Email{" "}
          <a href="mailto:admin@talkwithbravo.com" className="font-medium text-orange-700 underline underline-offset-4">
            admin@talkwithbravo.com
          </a>{" "}
          with a few times that suit you and we will arrange a session directly.
        </p>
        <a
          href={`https://cal.com/${calLink}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center text-sm font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800"
        >
          Or open the booking page on cal.com
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
