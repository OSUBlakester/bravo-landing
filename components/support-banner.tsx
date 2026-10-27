import { useEffect, useState } from "react"
import { Heart, X } from "lucide-react"

const DISMISS_KEY = "bravo-support-banner-dismissed"

/**
 * Floating prompt pointing at the Support Bravo section.
 *
 * It renders visible in the HTML and JavaScript only ever takes it away. An
 * earlier version did the opposite -- hidden by default, revealed by an effect
 * once scroll position and stored state had been read -- which meant anything
 * that stopped the effect running (stale cache, a hydration failure, blocked
 * storage) left it invisible with no way to tell why.
 *
 * The X hides it for good, remembered across visits. Following the link only
 * gets it out of the way of the section it scrolled to.
 */
export default function SupportBanner() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    try {
      if (window.localStorage.getItem(DISMISS_KEY) === "1") setHidden(true)
    } catch {
      // private window or blocked storage: leave it showing
    }
  }, [])

  if (hidden) return null

  function dismissForGood() {
    setHidden(true)
    try {
      window.localStorage.setItem(DISMISS_KEY, "1")
    } catch {
      // nothing to do; it will be back next visit
    }
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-40 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-80">
      <aside
        aria-label="Support Bravo"
        className="relative rounded-2xl border-2 border-orange-200 bg-white p-5 shadow-xl"
      >
        <button
          type="button"
          onClick={dismissForGood}
          aria-label="Dismiss"
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
          onClick={() => setHidden(true)}
          className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
        >
          Store &amp; donations
        </a>
      </aside>
    </div>
  )
}
