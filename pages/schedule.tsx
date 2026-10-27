import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Video, Clock, CheckCircle2, Mail, GraduationCap, HelpCircle } from "lucide-react"
import CalEmbed from "@/components/cal-embed"

/**
 * Cal.com booking handle, as "username/event-slug" — the part of the booking
 * URL after cal.com. Empty until the Cal.com account exists; the page then
 * shows the email fallback instead of the calendar.
 */
const CAL_LINK = "bravo-admin-lqdbh2/bravo-support-session"

const EXPECT = [
  {
    icon: Video,
    title: "A video call",
    body: "We meet over Google Meet. The link arrives with your confirmation email, and you join from a browser — nothing to install.",
  },
  {
    icon: Clock,
    title: "About an hour",
    body: "Long enough to set Bravo up properly, or to work right through whatever is giving you trouble, without watching the clock.",
  },
  {
    icon: CheckCircle2,
    title: "Free, like everything else",
    body: "Bravo is free and open source, and so is support. There is nothing to pay and nothing to sign up for beyond the booking.",
  },
]

const PREPARE = [
  "Have Bravo open on the device you actually use it on, and the device charged.",
  "Know which profile you are working with, and whether it is a Tap or Scan interface.",
  "If something is going wrong, note what you tried and what happened.",
  "Screen sharing helps a lot — we can look at the same thing rather than describing it.",
]

export default function Schedule() {
  return (
    <>
      <Head>
        <title>Schedule a Support Session | Talk With Bravo</title>
        <meta
          name="description"
          content="Book a free one-to-one video session to get help setting up or using Bravo, the open source AI-powered AAC application."
        />
      </Head>

      <div className="min-h-screen bg-white flex flex-col">
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center">
                <Image src="/images/bravo-logo.png" alt="Bravo" width={1094} height={320} className="h-11 w-auto" />
              </Link>
              <Link href="/" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                &larr; Back to talkwithbravo.com
              </Link>
            </div>
          </div>
        </header>

        <section className="bg-gradient-to-br from-orange-50 to-blue-50 py-16 border-b border-orange-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
              <Video className="h-4 w-4" />
              One to One
            </span>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">Schedule a Support Session</h1>
            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-orange-600" />
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Book a free video call and we will work through it together &mdash; setting Bravo up, tailoring it to the
              person using it, or sorting out something that is not behaving.
            </p>
          </div>
        </section>

        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">What to expect</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {EXPECT.map((item) => (
                <Card key={item.title} className="h-full border-2 border-orange-200 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100">
                      <item.icon className="h-5 w-5 text-orange-600" />
                    </div>
                    <h3 className="mt-4 font-semibold text-gray-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mt-16 scroll-mt-20" id="book">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Pick a time</h2>
            <p className="mt-3 text-gray-600">
              Times are shown in your own timezone. You will get a confirmation email with the meeting link, and a
              reminder before the session.
            </p>
            <div className="mt-8">
              {CAL_LINK ? (
                <CalEmbed calLink={CAL_LINK} />
              ) : (
                <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-8 text-center">
                  <h3 className="text-xl font-semibold text-gray-900">Online booking is opening shortly</h3>
                  <p className="mx-auto mt-3 max-w-xl text-gray-700">
                    In the meantime, email{" "}
                    <a
                      href="mailto:admin@talkwithbravo.com?subject=Support%20session"
                      className="font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800"
                    >
                      admin@talkwithbravo.com
                    </a>{" "}
                    with a few times that suit you and the timezone you are in, and we will set up a session.
                  </p>
                </div>
              )}
            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Before your session</h2>
            <p className="mt-3 text-gray-600">A few things that make the hour go further.</p>
            <ul className="mt-6 space-y-3">
              {PREPARE.map((line) => (
                <li key={line} className="flex gap-3 text-gray-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-orange-600" />
                  <span className="leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">If a video call does not suit you</h2>
            <p className="mt-3 text-gray-600">
              A scheduled call is not the right format for everyone, and it should never be the only way to get help.
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <Card className="h-full border-2 border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <Mail className="h-6 w-6 text-orange-600" />
                  <h3 className="mt-3 font-semibold text-gray-900">Write to us instead</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    Email support works at your own pace, with no appointment.
                  </p>
                  <a href="/support" className="mt-3 inline-block text-sm font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800">
                    Support page
                  </a>
                </CardContent>
              </Card>

              <Card className="h-full border-2 border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <GraduationCap className="h-6 w-6 text-orange-600" />
                  <h3 className="mt-3 font-semibold text-gray-900">Work through a course</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    Bravo University covers setup, the two interfaces, boards and buttons, and more.
                  </p>
                  <a href="/bravo-university" className="mt-3 inline-block text-sm font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800">
                    Browse courses
                  </a>
                </CardContent>
              </Card>

              <Card className="h-full border-2 border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <HelpCircle className="h-6 w-6 text-orange-600" />
                  <h3 className="mt-3 font-semibold text-gray-900">Check the FAQ</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    Common questions about how Bravo works, what it costs, and the devices it runs on.
                  </p>
                  <a href="/#faq" className="mt-3 inline-block text-sm font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800">
                    Read the FAQ
                  </a>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>

        <footer className="bg-gray-900 text-white py-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              <Link href="/support" className="text-gray-400 hover:text-white transition-colors">Support</Link>
              <Link href="/bravo-university" className="text-gray-400 hover:text-white transition-colors">Bravo University</Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            </nav>
            <p className="text-gray-500 text-sm mt-6">&copy; 2026 Talk With Bravo.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
