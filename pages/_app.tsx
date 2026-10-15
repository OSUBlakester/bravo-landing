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
function canonicalFor(pathname: string) {
  if (pathname === "/" || pathname === "/404") return SITE_ORIGIN + "/"
  return SITE_ORIGIN + pathname.replace(/\/$/, "")
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()

  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalFor(pathname)} />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
