import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/eula", label: "EULA" },
  { href: "/notices", label: "Third-Party Notices" },
  { href: "/support", label: "Support" },
]

type LegalLayoutProps = {
  title: string
  heading: string
  intro?: ReactNode
  children: ReactNode
}

/** Shared shell for the standalone legal/support pages linked from the app stores. */
export default function LegalLayout({ title, heading, intro, children }: LegalLayoutProps) {
  return (
    <>
      <Head>
        <title>{`${title} | Talk With Bravo`}</title>
        <meta name="description" content={`${title} for Bravo, the open source AI-powered AAC application.`} />
      </Head>

      <div className="min-h-screen bg-white flex flex-col">
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center">
                <Image src="/images/bravo-logo.jpg" alt="Bravo Logo" width={120} height={40} className="h-10 w-auto" />
              </Link>
              <Link href="/" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                &larr; Back to talkwithbravo.com
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-orange-600">Bravo</span>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">{heading}</h1>
          <div className="mt-5 h-1 w-16 rounded-full bg-orange-600" />
          {intro && <div className="mt-6 text-lg text-gray-600">{intro}</div>}
          <div className="mt-10">{children}</div>
        </main>

        <footer className="bg-gray-900 text-white py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {LEGAL_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="text-gray-400 hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
            <p className="text-gray-400 mt-6">
              Questions? Email{" "}
              <a href="mailto:admin@talkwithbravo.com" className="text-orange-400 hover:text-orange-300">
                admin@talkwithbravo.com
              </a>
              .
            </p>
            <p className="text-gray-500 text-sm mt-4">
              &copy; 2026 Talk With Bravo. Made with love for Brady and the AAC community.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}

/** Placeholder banner for documents that are drafted but not yet published. */
export function UnderConstruction({ document: doc }: { document: string }) {
  return (
    <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-6">
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-amber-700">Coming soon</p>
      <p className="mt-3 text-lg font-semibold text-gray-900">
        Our {doc} is being finalized and will be published here shortly.
      </p>
      <p className="mt-3 text-gray-700">
        This page is a placeholder so the link works while the document is in review. If you need a copy of the {doc} in
        the meantime, email{" "}
        <a href="mailto:admin@talkwithbravo.com" className="font-medium text-orange-700 underline underline-offset-4">
          admin@talkwithbravo.com
        </a>{" "}
        and we will send it to you.
      </p>
    </div>
  )
}
