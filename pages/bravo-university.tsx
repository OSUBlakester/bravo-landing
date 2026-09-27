import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Mail } from "lucide-react"
import { coursesByLevel, COURSES } from "@/lib/bravo-university"

export default function BravoUniversity() {
  const levels = coursesByLevel()

  return (
    <>
      <Head>
        <title>Bravo University | Talk With Bravo</title>
        <meta
          name="description"
          content="Free, step-by-step courses for the admins who set up and manage Bravo, the open source AI-powered AAC application."
        />
      </Head>

      <div className="min-h-screen bg-white flex flex-col">
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <section className="bg-gradient-to-br from-orange-50 to-blue-50 py-16 border-b border-orange-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
              <GraduationCap className="h-4 w-4" />
              Bravo University
            </span>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">Learn Bravo, Step by Step</h1>
            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-orange-600" />
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Short, guided courses for the people who set Bravo up and keep it running &mdash; parents, caregivers,
              educators, and therapists. Free, like everything else about Bravo.
            </p>
          </div>
        </section>

        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {levels.map((level) => (
            <section key={level.key} className="mb-16 last:mb-0">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-bold text-gray-900">{level.name}</h2>
                {level.description && <p className="mt-2 text-gray-600">{level.description}</p>}
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {level.courses.map((course) => (
                  <a
                    key={course.number}
                    href={course.href}
                    className="group block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                  >
                    <Card className="h-full border-2 border-orange-200 bg-white shadow-sm transition-all group-hover:border-orange-400 group-hover:shadow-md">
                      <CardContent className="flex h-full flex-col p-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100">
                            <GraduationCap className="h-5 w-5 text-orange-600" />
                          </div>
                          <span className="text-xs font-bold uppercase tracking-[0.14em] text-orange-600">
                            Course {course.number}
                          </span>
                        </div>
                        <h3 className="mt-4 text-xl font-semibold text-gray-900">{course.title}</h3>
                        <p className="mt-2 flex-1 text-gray-600 leading-relaxed">{course.blurb}</p>
                        {course.duration && <p className="mt-4 text-sm text-gray-500">{course.duration}</p>}
                        <span className="mt-5 inline-flex items-center font-medium text-orange-700 group-hover:text-orange-800">
                          Start course
                          <span aria-hidden="true" className="ml-2 transition-transform group-hover:translate-x-1">
                            &rarr;
                          </span>
                        </span>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </section>
          ))}

          <div className="mt-16 rounded-xl border-2 border-orange-200 bg-orange-50 p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900">More courses are on the way</h2>
            <p className="mt-3 text-gray-700 max-w-2xl mx-auto">
              We are building out Bravo University as Bravo grows. If there is a topic you would like covered, tell us
              and we will add it to the list.
            </p>
            <a
              href="/support"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-600 px-6 py-3 font-bold text-white transition-colors hover:bg-orange-700"
            >
              <Mail className="h-4 w-4" />
              Request a topic
            </a>
          </div>
        </main>

        <footer className="bg-gray-900 text-white py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/support" className="text-gray-400 hover:text-white transition-colors">
                Support
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </nav>
            <p className="text-gray-500 text-sm mt-6">
              &copy; 2026 Talk With Bravo. {COURSES.length} {COURSES.length === 1 ? "course" : "courses"} available.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
