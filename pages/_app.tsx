import Head from "next/head"
import { useRouter } from "next/router"
import type { AppProps } from "next/app"
import "../styles/globals.css"

export const SITE_ORIGIN = "https://talkwithbravo.com"

/**
 * Every page is reachable at more than one URL — Firebase serves /privacy,
 * /privacy/ and /privacy.html as the same document — so each page declares
 * which one is canonical. Without this Google reports
 * "Duplicate without user-selected canonical" and leaves pages unindexed.
 */
function canonicalFor(pathname: string): string | null {
  // The error and 404 pages are not real URLs; pointing a canonical at them, or
  // at the home page on their behalf, only misleads crawlers.
  if (pathname === "/404" || pathname === "/_error") return null
  if (pathname === "/") return SITE_ORIGIN + "/"
  return SITE_ORIGIN + pathname.replace(/\/$/, "")
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()

  const canonical = canonicalFor(pathname)

  return (
    <>
      <Head>
        {canonical && <link rel="canonical" href={canonical} />}
        {!canonical && <meta name="robots" content="noindex" />}
      </Head>
      <Component {...pageProps} />
    </>
  )
}
