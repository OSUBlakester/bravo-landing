import { useEffect, useState } from "react"
import { Heart, X } from "lucide-react"

const DISMISS_KEY = "bravo-support-banner-dismissed"
const SHOW_AFTER_PX = 0 // 0 shows it straight away; raise to delay until scrolled

/**
 * Floating prompt pointing at the Support Bravo section.
 *
 * Shown from the top of the page, but it can be dismissed and the dismissal
 * is remembered, so it never nags a returning reader. Storage access is
 * wrapped because it throws in private windows.
 */
export default function SupportBanner() {
  const [dismissed, setDismissed] = useState(true) // assume hidden until storage is read
  const [scrolledEnough, setScrolledEnough] = useState(false)

  useEffect(() => {
    let alreadyDismissed = false
    try {
      alreadyDismissed = window.localStorage.getItem(DISMISS_KEY) === "1"
    } catch {
      // private window or blocked storage: just show it this session
    }
    setDismissed(alreadyDismissed)

    const onScroll = () => setScrolledEnough(window.scrollY >= SHOW_AFTER_PX)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  function dismiss() {
    setDismissed(true)
    try {
      window.localStorage.setItem(DISMISS_KEY, "1")
    } catch {
      // nothing to do; it will reappear next visit
    }
  }

  const visible = !dismissed && scrolledEnough

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-4 bottom-4 z-40 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[22rem]
        transition-all duration-300 motion-reduce:transition-none
        ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      <aside
        aria-label="Support Bravo"
        className="relative rounded-2xl border-2 border-orange-200 bg-white p-5 shadow-xl"
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          tabIndex={visible ? 0 : -1}
          className="absolute right-3 top-3 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 pr-8">
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-orange-100">
            <Heart className="h-5 w-5 text-orange-600" />
          </span>
          <p className="text-base font-bold text-gray-900">Help keep Bravo free!</p>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          Bravo is free and open source for everyone. Visit the Bravo store or make a donation to help cover the costs
          of running it.
        </p>

        <a
          href="#support"
          onClick={dismiss}
          tabIndex={visible ? 0 : -1}
          className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
        >
          Store &amp; donations
        </a>
      </aside>
    </div>
  )
}
