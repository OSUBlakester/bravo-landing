import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Play, MessageCircle, Brain, Users, Smartphone, Zap, Heart, Mail, ExternalLink, Info, Hand, Gamepad2, BookOpen, Settings2, ArrowRightLeft, Languages, Github, Coffee, Shirt, Code2, Instagram, Youtube, Plane, Sparkles, MessagesSquare, Trophy } from "lucide-react"
import Image from "next/image"
import { useState, type ReactNode } from "react"

const BRAVO_YOUTUBE_URL = "https://www.youtube.com/@TalkWithBravo"

const BRAVO_WINS = [
  {
    icon: MessageCircle,
    title: "A Curious Question, Answered Directly",
    body:
      "A little boy noticed Brady was using oxygen and wanted to know why. With Bravo, he could ask Brady himself \u2014 " +
      "and Brady answered him directly: \u201cMy lungs just need a little help.\u201d",
  },
  {
    icon: Sparkles,
    title: "Catching Up With Cousins",
    body:
      "At a large family gathering, Brady asked his cousins about the specific things they had each been up to lately, " +
      "in the moment, without waiting for someone to guess what he wanted to say.",
  },
  {
    icon: Plane,
    title: "Commenting on the World",
    body:
      "Brady takes Bravo along on trips. On a cruise and at Walt Disney World, he shared what he thought of the " +
      "scenery and the activities as they happened.",
  },
  {
    icon: MessagesSquare,
    title: "A Regular in Three Speech Groups",
    body:
      "Brady now takes part in three different speech groups, where he stays engaged and can talk about recent " +
      "events with ease.",
  },
] as const

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/talkwithbravo/", handle: "@talkwithbravo" },
  { label: "YouTube", href: BRAVO_YOUTUBE_URL, handle: "@TalkWithBravo" },
  { label: "TikTok", href: "https://www.tiktok.com/@talkwithbravo", handle: "@talkwithbravo" },
] as const

/** TikTok mark — lucide-react has no TikTok icon, so this is an inline SVG. */
function TikTokIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .77-5.06V9.68a5.68 5.68 0 1 0 4.9 5.62V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.29 4.29 0 0 1-3.23-1.48Z" />
    </svg>
  )
}

function SocialIcon({ label, className = "" }: { label: string; className?: string }) {
  if (label === "Instagram") return <Instagram className={className} aria-hidden="true" />
  if (label === "YouTube") return <Youtube className={className} aria-hidden="true" />
  return <TikTokIcon className={className} />
}

type SectionHeadingProps = {
  eyebrow: string
  title: string
  children?: ReactNode
  variant?: "light" | "dark"
  className?: string
}

/** Shared section header: eyebrow label, title, accent rule, and optional lead paragraph. */
function SectionHeading({ eyebrow, title, children, variant = "light", className = "" }: SectionHeadingProps) {
  const isDark = variant === "dark"

  return (
    <div className={`text-center ${className}`}>
      <span
        className={`inline-block text-xs font-bold uppercase tracking-[0.18em] ${
          isDark ? "text-orange-100" : "text-orange-600"
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`mt-3 text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
      >
        {title}
      </h2>
      <div className={`mx-auto mt-5 h-1 w-16 rounded-full ${isDark ? "bg-white/70" : "bg-orange-600"}`} />
      {children && (
        <div className={`mt-6 space-y-4 text-xl ${isDark ? "text-orange-50" : "text-gray-600"}`}>{children}</div>
      )}
    </div>
  )
}

export default function BravoLandingPage() {
  const BRAVO_APP_URL = "https://app.talkwithbravo.com/static/auth.html?email=demoreadonly@talkwithbravo.com"
  const BRAVO_REGISTER_URL = "https://app.talkwithbravo.com/auth.html"
  const BRAVO_GITHUB_URL = "https://github.com/OSUBlakester/BravoGCPCopilot"
  const BRAVO_KOFI_URL = "https://ko-fi.com/supportbravo"
  const BRAVO_MERCH_URL = "https://www.bonfire.com/store/support-bravo-aac/?utm_source=native_share&utm_medium=store_page_published_share&utm_campaign=support-bravo-aac&utm_content=default"
  const [showDemoGuide, setShowDemoGuide] = useState(false)
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Image src="/images/bravo-logo.jpg" alt="Bravo Logo" width={120} height={40} className="h-10 w-auto" />
            </div>
            <nav className="hidden lg:flex items-center space-x-6">
              <a href="#features" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Features</a>
              <a href="#story" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Our Story</a>
              <a href="#team" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Our Team</a>
              <a href="#mission" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Our Mission</a>
              <a href="#demo" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Demo</a>
              <a href="#faq" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">FAQ</a>
              <a href="#contact" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Contact</a>
              <a href="#open-source" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Open Source</a>
              <a href="#support" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Support Bravo</a>
            </nav>
            <div className="flex gap-2">
              <Button 
                className="bg-orange-600 hover:bg-orange-700 text-white"
                onClick={() => {
                  document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Try Demo
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => window.open("https://app.talkwithbravo.com/", '_blank')}
              >
                Log Into My Account
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <Badge className="bg-orange-100 text-orange-800 border-orange-200">Revolutionary AAC Technology</Badge>
              <Badge className="bg-green-100 text-green-800 border-green-200">Open Source &amp; Free</Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
              Set Your Voice <span className="text-orange-600">Free</span> with Bravo
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto text-pretty">
              An innovative, Google Gemini AI-enhanced AAC application that finally gives you full freedom of expression.
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto text-pretty">
              Bravo is <span className="font-semibold text-gray-900">open source</span> and free for everyone. The code
              is public, the community is welcome, and communication should never come with a price tag.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white" onClick={() => window.open(BRAVO_YOUTUBE_URL, '_blank')}>
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-navy-600 text-navy-600 hover:bg-navy-50 bg-transparent"
                onClick={() => {
                  document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Try Live Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-900 text-gray-900 hover:bg-gray-100 bg-transparent"
                onClick={() => window.open(BRAVO_GITHUB_URL, '_blank')}
              >
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="scroll-mt-16 py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Features" title="Revolutionary AAC Features" className="mb-16">
            <p className="max-w-3xl mx-auto">
              Bravo breaks free from traditional AAC limitations with GoogleGemini AI-powered innovations that give users their true
              voice.
            </p>
          </SectionHeading>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="h-full border-2 shadow-sm transition-all hover:border-orange-200 hover:shadow-md">
              <CardHeader>
                <Brain className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-xl">AI-Powered Communication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Turn a simple prompt into natural, personalized responses that sound more like the user and less like a preset device.
                </p>
                <a
                  href={BRAVO_YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-orange-700/80 underline-offset-4 transition-colors hover:text-orange-700 hover:underline"
                >
                  See Demo
                </a>
              </CardContent>
            </Card>

            <Card className="h-full border-2 shadow-sm transition-all hover:border-orange-200 hover:shadow-md">
              <CardHeader>
                <MessageCircle className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-xl">Wake Word Feature</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Activate Bravo with a custom wake word and get fast, conversational responses right when the moment happens.
                </p>
                <a
                  href={BRAVO_YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-orange-700/80 underline-offset-4 transition-colors hover:text-orange-700 hover:underline"
                >
                  See Demo
                </a>
              </CardContent>
            </Card>

            <Card className="h-full border-2 shadow-sm transition-all hover:border-orange-200 hover:shadow-md">
              <CardHeader>
                <Users className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-xl">Personal Context</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Bravo uses the user's story, relationships, routines, and preferences to make every interaction more personal and relevant.
                </p>
                <a
                  href={BRAVO_YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-orange-700/80 underline-offset-4 transition-colors hover:text-orange-700 hover:underline"
                >
                  See Demo
                </a>
              </CardContent>
            </Card>

            <Card className="h-full border-2 shadow-sm transition-all hover:border-orange-200 hover:shadow-md">
              <CardHeader>
                <Hand className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-xl">Adaptive Access Interfaces</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Purpose-built interfaces for auditory scanning and touch access deliver a better fit than one-size-fits-all AAC.
                </p>
                <a
                  href={BRAVO_YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-orange-700/80 underline-offset-4 transition-colors hover:text-orange-700 hover:underline"
                >
                  See Demo
                </a>
              </CardContent>
            </Card>

            <Card className="h-full border-2 shadow-sm transition-all hover:border-orange-200 hover:shadow-md">
              <CardHeader>
                <Languages className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-xl">Multiple Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Choose one language for the AAC user and another for the communication partner, then switch partner language by location, like Spanish at home and English at school.
                </p>
                <a
                  href={BRAVO_YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-orange-700/80 underline-offset-4 transition-colors hover:text-orange-700 hover:underline"
                >
                  See Demo
                </a>
              </CardContent>
            </Card>

            <Card className="h-full border-2 shadow-sm transition-all hover:border-orange-200 hover:shadow-md">
              <CardHeader>
                <Smartphone className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-xl">Cross-Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Use Bravo across Windows, iOS, and Android so communication can move with the user.
                </p>
                <a
                  href={BRAVO_YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-orange-700/80 underline-offset-4 transition-colors hover:text-orange-700 hover:underline"
                >
                  See Demo
                </a>
              </CardContent>
            </Card>

            <Card className="h-full border-2 shadow-sm transition-all hover:border-orange-200 hover:shadow-md">
              <CardHeader>
                <Gamepad2 className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-xl">Accessible Social Games</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Play 20 Questions, Guess Who, and Tic-Tac-Toe in accessible formats that spark real back-and-forth connection.
                </p>
                <a
                  href={BRAVO_YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-orange-700/80 underline-offset-4 transition-colors hover:text-orange-700 hover:underline"
                >
                  See Demo
                </a>
              </CardContent>
            </Card>

            <Card className="h-full border-2 shadow-sm transition-all hover:border-orange-200 hover:shadow-md">
              <CardHeader>
                <Heart className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-xl">Freedom of Expression</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Give users more freedom to explore, express, and communicate with less friction.
                </p>
                <a
                  href={BRAVO_YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-orange-700/80 underline-offset-4 transition-colors hover:text-orange-700 hover:underline"
                >
                  See Demo
                </a>
              </CardContent>
            </Card>

            <Card className="h-full border-2 shadow-sm transition-all hover:border-orange-200 hover:shadow-md">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-xl">Story Builder</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Create stories through shared back-and-forth communication, then save and export them to share beyond Bravo.
                </p>
                <a
                  href={BRAVO_YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-orange-700/80 underline-offset-4 transition-colors hover:text-orange-700 hover:underline"
                >
                  See Demo
                </a>
              </CardContent>
            </Card>

            <Card className="h-full border-2 shadow-sm transition-all hover:border-orange-200 hover:shadow-md">
              <CardHeader>
                <Settings2 className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-xl">Easy Administration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Update Bravo on the device or from a computer and push changes instantly, with typed or dictated input.
                </p>
                <a
                  href={BRAVO_YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-orange-700/80 underline-offset-4 transition-colors hover:text-orange-700 hover:underline"
                >
                  See Demo
                </a>
              </CardContent>
            </Card>

            <Card className="h-full border-2 shadow-sm transition-all hover:border-orange-200 hover:shadow-md">
              <CardHeader>
                <ArrowRightLeft className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-xl">AAC Vocabulary Migration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Import vocabulary from popular AAC applications, including Accent/NuVoice<sup className="align-super text-[10px]">®</sup> and TouchChat<sup className="align-super text-[10px]">®</sup>, to get started with Bravo faster.
                </p>
                <a
                  href={BRAVO_YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-orange-700/80 underline-offset-4 transition-colors hover:text-orange-700 hover:underline"
                >
                  See Demo
                </a>
              </CardContent>
            </Card>

            <Card className="h-full border-2 shadow-sm transition-all hover:border-orange-200 hover:shadow-md">
              <CardHeader>
                <Zap className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-xl">Favorite Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Bring current events, favorite interests, and fresh conversation starters into everyday communication.
                </p>
                <a
                  href={BRAVO_YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-orange-700/80 underline-offset-4 transition-colors hover:text-orange-700 hover:underline"
                >
                  See Demo
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="scroll-mt-16 py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionHeading eyebrow="Our Story" title="Our Story: Brady's Voice" className="mb-12">
              <p>BRAVO = Brady's + Voice. A family's 20-year journey to set their son's voice free.</p>
            </SectionHeading>

            <Card className="border-2 border-orange-200 bg-white shadow-sm">
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Augmentative and Alternative Communication (AAC) refers to all the ways someone communicates besides
                    talking. For the past 20 years, our son Brady has used AAC to communicate. He has always used a
                    single switch to access a communication device to express himself. While he is incredibly proficient
                    with his communication device, the limitations of pre-programmed vocabulary sometimes hindered
                    Brady's ability to fully express himself and connect socially.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Anne and Blake created Bravo out of love for Brady, with a single goal: to give him more to say and more ways
                    to say it. We had watched Brady and AAC grow together for two decades, and we knew there had to be a
                    better way &mdash; one that let him start the conversation, share what he was actually thinking, and
                    truly engage with the people around him.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    With AI, we created an AAC application that truly captures Brady's voice. Our goal is to create an
                    AAC application without limits. Users are no longer limited by what is manually programmed - AI
                    dynamically creates options that may not have even been considered, while still representing the
                    user's authentic voice.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Brady is also no longer limited by expensive and bulky devices. Bravo can be installed on easily
                    portable and affordable devices and even moved from one device to another.
                  </p>
                  <blockquote className="border-l-4 border-orange-600 pl-6 italic text-gray-800 text-xl">
                    "With Bravo, we now hear Brady's TRUE voice. He can express his TRUE self in ways and places we
                    could have only imagined before."
                  </blockquote>
                </div>
              </CardContent>
            </Card>

            {/* Bravo Wins */}
            <div className="mt-16">
              <div className="text-center">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
                  <Trophy className="h-4 w-4" />
                  Bravo Wins
                </span>
                <h3 className="mt-3 text-2xl md:text-3xl font-bold text-gray-900">Moments That Made It Worth It</h3>
                <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-orange-600" />
                <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                  Real moments from Brady's life since Bravo &mdash; the kind of everyday connection that used to be out
                  of reach.
                </p>
              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {BRAVO_WINS.map((win) => (
                  <Card
                    key={win.title}
                    className="h-full border-2 border-orange-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                  >
                    <CardContent className="flex h-full flex-col p-6">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100">
                        <win.icon className="h-5 w-5 text-orange-600" />
                      </div>
                      <h4 className="mt-4 text-lg font-semibold text-gray-900">{win.title}</h4>
                      <p className="mt-2 text-gray-600 leading-relaxed">{win.body}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="scroll-mt-16 py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Our Team" title="Our Team" className="max-w-4xl mx-auto mb-12">
            <p>Meet the passionate people behind Bravo.</p>
          </SectionHeading>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Brady Thomas */}
            <Card className="h-full border-2 border-orange-200 bg-white shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-8 flex h-full flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 ring-4 ring-orange-50 mb-5 flex items-center justify-center">
                  {/* Placeholder for Brady's photo */}
                  <span className="text-4xl text-orange-600 font-bold">B</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Brady Thomas</h3>
                <p className="text-orange-600 font-medium mb-1">Chief Experience Officer</p>
              </CardContent>
            </Card>
            {/* Blake Thomas */}
            <Card className="h-full border-2 border-orange-200 bg-white shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-8 flex h-full flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 ring-4 ring-orange-50 mb-5 flex items-center justify-center">
                  {/* Placeholder for Blake's photo */}
                  <span className="text-4xl text-orange-600 font-bold">B</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Blake Thomas</h3>
                <p className="text-orange-600 font-medium mb-1">VP of Product Development</p>
              </CardContent>
            </Card>
            {/* Anne Thomas */}
            <Card className="h-full border-2 border-orange-200 bg-white shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-8 flex h-full flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 ring-4 ring-orange-50 mb-5 flex items-center justify-center">
                  {/* Placeholder for Anne's photo */}
                  <span className="text-4xl text-orange-600 font-bold">A</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Anne Thomas</h3>
                <p className="text-orange-600 font-medium mb-1">VP of Client Experience</p>
              </CardContent>
            </Card>
            {/* Jill Tullman */}
            <Card className="h-full border-2 border-orange-200 bg-white shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-8 flex h-full flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 ring-4 ring-orange-50 mb-5 flex items-center justify-center">
                  {/* Placeholder for Jill's photo */}
                  <span className="text-4xl text-orange-600 font-bold">J</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Jill Tullman</h3>
                <p className="text-orange-600 font-medium mb-1">VP of Clinical Experience</p>
                <p className="text-sm text-gray-500">Speech-Language Pathologist</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="scroll-mt-16 py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Our Mission" title="Our Mission" className="max-w-4xl mx-auto mb-10">
            <p>
              Our mission is to provide Bravo to anyone who could benefit from an AAC application that empowers
              individuals to express themselves without limitations.
            </p>
            <p>
              That is why we made Bravo open source and free. Removing the cost and opening the code is the surest way to
              put Bravo in the hands of every person who needs a voice.
            </p>
          </SectionHeading>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="scroll-mt-16 py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Demo" title="See Bravo in Action" className="mb-16">
            <p className="max-w-3xl mx-auto">
              Experience the power of AI-driven communication and see how Bravo gives users their true voice.
            </p>
          </SectionHeading>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="h-full border-2 shadow-sm transition-all hover:border-orange-200 hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Play className="mr-3 h-6 w-6 text-orange-600" />
                  Video Demonstrations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Watch comprehensive demos showing Bravo's AI features, wake word functionality, and real
                  conversations.
                </p>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white" onClick={() => window.open(BRAVO_YOUTUBE_URL, '_blank')}>Watch Videos</Button>
              </CardContent>
            </Card>

            <Card className="h-full border-2 shadow-sm transition-all hover:border-orange-200 hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <ExternalLink className="mr-3 h-6 w-6 text-orange-600" />
                  Try Live Demo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Experience Bravo firsthand with our demo account. See how AI generates personalized communication
                  options.
                </p>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent"
                    onClick={() => setShowDemoGuide(!showDemoGuide)}
                  >
                    <Info className="mr-2 h-4 w-4" />
                    {showDemoGuide ? 'Hide Demo Guide' : 'Show Demo Guide'}
                  </Button>
                  
                  {showDemoGuide && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                      <h4 className="font-semibold text-blue-900 mb-2">Demo Instructions:</h4>
                      <ul className="space-y-1 text-blue-800 mb-3">
                        <li>• You'll be logged in automatically with a demo account</li>
                        <li>• Select a Profile - each profile name includes the user name and interface type (e.g. "Buddy_TAP", "Buddy_SCAN")</li>
                        <li>• Try different profiles to experience how the same user can interact with different interfaces (TAP, SCAN, etc.)</li>
                        <li>• Notice that each profile has a different number of communication options and button sizes customized for that interface</li>
                        <li>• Click on available communication options, especially the "About Me" option</li>
                        <li>• Test the wake word feature by saying "Hey" + profile name (e.g. "Hey Buddy" or "Hey Charlie") then ask a question</li>
                        <li>• Try the Free Style page to see how powerful, flexible and dynamic the communication options can be</li>
                        <li>• Explore Admin settings by clicking the Lock icon and entering PIN: 1234</li>
                        <li>• Click the Help button for additional guidance</li>
                        <li>• Demo account is read-only - perfect for exploring safely</li>
                      </ul>
                      <p className="text-xs text-blue-700">
                        <strong>Note:</strong> For the best experience, use Chrome or Safari with microphone access enabled.
                      </p>
                    </div>
                  )}
                  
                  <Button
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                    onClick={() => window.open(BRAVO_APP_URL, '_blank')}
                  >
                    Launch Demo App
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section id="faq" className="scroll-mt-16 py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" className="mb-16">
            <p>Learn more about Bravo and how it revolutionizes AAC communication.</p>
          </SectionHeading>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="what-is-aac" className="border border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-left">What is AAC and how is Bravo different?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                AAC (Augmentative and Alternative Communication) helps people with limited or no speech communicate.
                Unlike traditional AAC apps that require manual programming, Bravo uses AI to dynamically generate
                conversational options that truly represent the user's voice.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="how-ai-works" className="border border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-left">How does the AI understand the user's context?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Bravo incorporates personal information including the user's narrative, family and friends, current
                location, mood, and interests. This context helps AI generate appropriate and personalized communication
                options that sound like the user's authentic voice.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="wake-word" className="border border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-left">What is the wake word feature?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                The wake word feature allows anyone to ask the user a question, and AI will generate appropriate
                response options based on the user's personal context. This eliminates the need for yes/no questions or
                lengthy navigation to find suitable responses.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="devices" className="border border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-left">What devices does Bravo work on?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Bravo is available on Windows, iOS, and Android devices. You can easily move the app from one device to
                another, making it much more portable and affordable than traditional AAC devices.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="open-source" className="border border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-left">Is Bravo really open source?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes. Bravo's source code is publicly available on GitHub at{" "}
                <a
                  href={BRAVO_GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 underline underline-offset-4 hover:text-orange-700"
                >
                  github.com/OSUBlakester/BravoGCPCopilot
                </a>
                . Anyone can read the code, run it themselves, report issues, or contribute improvements.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cost" className="border border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-left">How much does Bravo cost?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Bravo is free. There is no subscription, no trial period, and no expiration date. If you would like to
                help cover the AI and hosting costs that keep Bravo free for everyone, you can donate on Ko-fi or buy
                merchandise from our Bonfire store, but neither is required to use Bravo.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="contribute" className="border border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-left">How can I support or contribute to Bravo?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Developers can open issues and pull requests on GitHub. Everyone else can help by donating on{" "}
                <a
                  href={BRAVO_KOFI_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 underline underline-offset-4 hover:text-orange-700"
                >
                  Ko-fi
                </a>
                , picking up something from our{" "}
                <a
                  href={BRAVO_MERCH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 underline underline-offset-4 hover:text-orange-700"
                >
                  Bonfire store
                </a>
                , sharing feedback, or spreading the word to other AAC families and clinicians.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="getting-started" className="border border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-left">How do I get started with Bravo?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                You can try our live demo at {BRAVO_APP_URL} using the demo account (demoreadonly@talkwithbravo.com), watch
                our video demonstrations, or contact us directly at admin@talkwithbravo.com for more information about
                getting Bravo for your needs.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA / Contact Section */}
      <section id="contact" className="scroll-mt-16 py-24 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading eyebrow="Contact" title="Ready to Experience True Freedom of Expression?" variant="dark">
            <p className="max-w-2xl mx-auto">
              Join Brady and countless others who have found their authentic voice with Bravo's revolutionary AI-powered
              AAC technology. Bravo is open source and free for everyone.
            </p>
          </SectionHeading>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 mb-12">
            <Button
              size="lg"
              className="bg-white text-orange-700 hover:bg-orange-50"
              onClick={() => window.open(BRAVO_REGISTER_URL, '_blank')}
            >
              Create a Free Account
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-orange-700 bg-transparent"
              onClick={() => window.open(BRAVO_GITHUB_URL, '_blank')}
            >
              <Github className="mr-2 h-5 w-5" />
              View on GitHub
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <form
              action="https://formspree.io/f/xqadarrp"
              method="POST"
              className="bg-white rounded-lg shadow-lg p-8 max-w-xl mx-auto w-full text-left"
            >
              <h3 className="text-2xl font-bold text-orange-700 mb-6 text-center">Contact Us</h3>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                <input type="text" id="name" name="name" required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <input type="email" id="email" name="email" required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600" />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block text-gray-700 font-medium mb-2">I am</label>
                <select id="role" name="role" required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600">
                  <option value="Parent">Parent</option>
                  <option value="Caregiver">Caregiver</option>
                  <option value="Therapist">Therapist</option>
                  <option value="Educator">Educator</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea id="message" name="message" rows={5} required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"></textarea>
              </div>
              <button type="submit" className="w-full bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-700 transition">Submit</button>
            </form>
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section id="open-source" className="scroll-mt-16 py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Open Source" title="Bravo is Open Source" className="max-w-4xl mx-auto mb-12">
            <p>
              We believe a voice should never be locked behind a paywall or a proprietary device. That is why Bravo's
              source code is publicly available on GitHub for anyone to use, study, improve, and share.
            </p>
            <p className="text-lg">
              Families, therapists, educators, and developers can all see exactly how Bravo works, run it themselves, and
              help shape where it goes next. Bravo is free for everyone, and we intend to keep it that way.
            </p>
          </SectionHeading>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="h-full border-2 border-orange-200 shadow-sm transition-shadow hover:shadow-md">
              <CardHeader>
                <Code2 className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-xl">Transparent by Design</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Every line of Bravo is open for inspection. See how the AI generates communication options and how
                  personal context is handled.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full border-2 border-orange-200 shadow-sm transition-shadow hover:shadow-md">
              <CardHeader>
                <Heart className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-xl">Free for Everyone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  No subscriptions, no trials, no expiration dates. Bravo is free to use for every AAC user, family, and
                  clinician who needs it.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full border-2 border-orange-200 shadow-sm transition-shadow hover:shadow-md">
              <CardHeader>
                <Users className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-xl">Built With the Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Contributions, bug reports, and feature ideas are welcome. Bravo gets better every time someone in the
                  AAC community pitches in.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 text-white"
              onClick={() => window.open(BRAVO_GITHUB_URL, '_blank')}
            >
              <Github className="mr-2 h-5 w-5" />
              View the Source on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="scroll-mt-16 py-24 bg-gradient-to-br from-orange-50 to-blue-50 border-t border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Support Bravo" title="Help Keep Bravo Free" className="max-w-4xl mx-auto mb-12">
            <p>
              Bravo is free and open source, but it isn't free to run. Donations and merchandise sales cover AI and
              hosting costs so that Bravo can stay free for every AAC user. Support is always optional and never required
              to use Bravo.
            </p>
          </SectionHeading>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="h-full border-2 border-orange-200 bg-white shadow-sm transition-shadow hover:shadow-md">
              <CardHeader>
                <Coffee className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-xl">Donate on Ko-fi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  A one-time or recurring donation goes directly toward keeping Bravo running and free for the AAC
                  community.
                </p>
                <Button
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  onClick={() => window.open(BRAVO_KOFI_URL, '_blank')}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Support Bravo on Ko-fi
                </Button>
              </CardContent>
            </Card>

            <Card className="h-full border-2 border-orange-200 bg-white shadow-sm transition-shadow hover:shadow-md">
              <CardHeader>
                <Shirt className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-xl">Shop Bravo Merchandise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Grab a shirt or other gear from our Bonfire store. You get something you love, and Bravo gets the
                  support it needs to stay free.
                </p>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => window.open(BRAVO_MERCH_URL, '_blank')}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit the Bravo Store
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 max-w-2xl mx-auto text-center">
            <p className="text-gray-600">
              Not able to donate? Contributing code, reporting a bug, or simply telling another family about Bravo helps
              just as much. Follow along and share Bravo with your community.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Bravo on ${social.label} (${social.handle})`}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-orange-200 bg-white px-5 py-2.5 font-medium text-gray-700 shadow-sm transition-colors hover:border-orange-400 hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                >
                  <SocialIcon label={social.label} className="h-5 w-5 text-orange-600" />
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <Image
                src="/images/bravo-logo.jpg"
                alt="Bravo Logo"
                width={150}
                height={50}
                className="h-12 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-gray-400">
                Setting voices free with AI-powered AAC technology. Created with love for Brady and all AAC users.
              </p>
              <p className="text-gray-400 mt-4">
                Bravo is open source and free for everyone.
              </p>

              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-300 mt-6 mb-3">Follow Bravo</h3>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Bravo on ${social.label} (${social.handle})`}
                    title={`${social.label} — ${social.handle}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition-colors hover:bg-orange-600 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                  >
                    <SocialIcon label={social.label} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#story" className="text-gray-400 hover:text-white transition-colors">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#demo" className="text-gray-400 hover:text-white transition-colors">
                    Demo
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-gray-400 hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#open-source" className="text-gray-400 hover:text-white transition-colors">
                    Open Source
                  </a>
                </li>
                <li>
                  <a href="#support" className="text-gray-400 hover:text-white transition-colors">
                    Support Bravo
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact &amp; Community</h3>
              <div className="space-y-2">
                <p className="text-gray-400">
                  <Mail className="inline h-4 w-4 mr-2" />
                  admin@talkwithbravo.com
                </p>
                <p className="text-gray-400">
                  <ExternalLink className="inline h-4 w-4 mr-2" />
                  talkwithbravo.com
                </p>
                <p className="text-gray-400">Demo: demoreadonly@talkwithbravo.com</p>
                <p>
                  <a
                    href={BRAVO_GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Github className="inline h-4 w-4 mr-2" />
                    Source code on GitHub
                  </a>
                </p>
                <p>
                  <a
                    href={BRAVO_KOFI_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Coffee className="inline h-4 w-4 mr-2" />
                    Donate on Ko-fi
                  </a>
                </p>
                <p>
                  <a
                    href={BRAVO_MERCH_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Shirt className="inline h-4 w-4 mr-2" />
                    Bravo merchandise store
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Legal &amp; Help</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/eula" className="text-gray-400 hover:text-white transition-colors">
                    EULA
                  </a>
                </li>
                <li>
                  <a href="/notices" className="text-gray-400 hover:text-white transition-colors">
                    Third-Party Notices
                  </a>
                </li>
                <li>
                  <a href="/support" className="text-gray-400 hover:text-white transition-colors">
                    Help &amp; Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2026 Talk With Bravo. Made with ❤️ for Brady and the AAC community.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}