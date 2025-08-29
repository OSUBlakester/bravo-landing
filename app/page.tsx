"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Play, MessageCircle, Brain, Users, Smartphone, Zap, Heart, Mail, ExternalLink } from "lucide-react"
import Image from "next/image"

export default function BravoLandingPage() {
  const BRAVO_APP_URL = "https://bravo-aac-api-lnquhqxkjq-uc.a.run.app/static/auth.html?email=demoreadonly@talkwithbravo.com"
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Image src="/images/bravo-logo.jpg" alt="Bravo Logo" width={120} height={40} className="h-10 w-auto" />
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Features</a>
              <a href="#story" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Our Story</a>
              <a href="#team" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Our Team</a>
              <a href="#mission" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Our Mission</a>
              <a href="#demo" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Demo</a>
              <a href="#faq" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">FAQ</a>
              <a href="#contact" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Contact</a>
            </nav>
            <div className="flex gap-2">
              <Button 
                className="bg-orange-600 hover:bg-orange-700 text-white"
                onClick={() => window.open(BRAVO_APP_URL, '_blank')}
              >
                Try Demo
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => window.open("https://bravo-aac-api-lnquhqxkjq-uc.a.run.app/", '_blank')}
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
            <Badge className="bg-orange-100 text-orange-800 border-orange-200 mb-6">Revolutionary AAC Technology</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
              Set Your Voice <span className="text-orange-600">Free</span> with Bravo
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto text-pretty">
              An innovative, AI-enhanced AAC application that finally gives you full freedom of expression.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white" onClick={() => window.open("https://www.youtube.com/@TalkWithBravo", '_blank')}>
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-navy-600 text-navy-600 hover:bg-navy-50 bg-transparent"
                onClick={() => window.open(BRAVO_APP_URL, '_blank')}
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Try Live Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Revolutionary AAC Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bravo breaks free from traditional AAC limitations with AI-powered innovations that give users their true
              voice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-orange-200 transition-colors">
              <CardHeader>
                <Brain className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-xl">AI-Powered Communication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Instead of using a massive library of generic, pre-programmed options or manually adding custom options, Bravo dynamically generates conversational options that truly represent your voice, all with a simple prompt.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-orange-200 transition-colors">
              <CardHeader>
                <MessageCircle className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-xl">Wake Word Feature</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Just like your smart device at home or your assistant on your phone, you can use a custom Wake Word to alert Bravo that you would like to ask a question.  Bravo will listen to your question and  quickly generates appropriate, conversational response.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-orange-200 transition-colors">
              <CardHeader>
                <Users className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-xl">Personal Context</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Bravo incorporates your story.  Your history, likes, dislikes, family, friends, current location, recent activities, upcoming activities, and even daily mood to provide better context for
                  meaningful communication.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-orange-200 transition-colors">
              <CardHeader>
                <Zap className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-xl">Favorite Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Stay current with your favorite topics. Bravo can connect online and provide options to discuss the latest stories and news with those around you.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-orange-200 transition-colors">
              <CardHeader>
                <Smartphone className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-xl">Cross-Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Available on Windows, iOS, and Android. Move seamlessly between affordable, portable devices.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-orange-200 transition-colors">
              <CardHeader>
                <Heart className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-xl">Freedom of Expression</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Free style page with ultimate freedom to select options and AI assistance to make communication more
                  efficient.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

  {/* Story Section */}
      {/* Team Section */}
      <section id="team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 mb-8">Meet the passionate people behind Bravo.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {/* Brady Thomas */}
            <Card className="border-2 border-orange-200 flex flex-col items-center">
              <CardContent className="p-8 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
                  {/* Placeholder for Brady's photo */}
                  <span className="text-4xl text-orange-600 font-bold">B</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Brady Thomas</h3>
                <p className="text-orange-600 font-medium mb-1">Chief Experience Officer</p>
              </CardContent>
            </Card>
            {/* Blake Thomas */}
            <Card className="border-2 border-orange-200 flex flex-col items-center">
              <CardContent className="p-8 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
                  {/* Placeholder for Blake's photo */}
                  <span className="text-4xl text-orange-600 font-bold">B</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Blake Thomas</h3>
                <p className="text-orange-600 font-medium mb-1">Director of Product Development</p>
              </CardContent>
            </Card>
            {/* Anne Thomas */}
            <Card className="border-2 border-orange-200 flex flex-col items-center">
              <CardContent className="p-8 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
                  {/* Placeholder for Anne's photo */}
                  <span className="text-4xl text-orange-600 font-bold">A</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Anne Thomas</h3>
                <p className="text-orange-600 font-medium mb-1">Director of Client Experience</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 mb-8">Our mission is to provide Bravo to anyone who could benefit from an AAC application that empowers individuals to express themselves without limitations.</p>
          </div>
        </div>
      </section>
      <section id="story" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Story: Brady's Voice</h2>
              <p className="text-xl text-gray-600">
                BRAVO = Brady's + Voice. A family's 20-year journey to set their son's voice free.
              </p>
            </div>

            <Card className="border-2 border-orange-200">
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Blake created Bravo out of love for our son, Brady. For the past 20 years, Brady has successfully used Augmentative and Alternative Communication (AAC) to communicate
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    AAC refers to all the ways someone communicates besides talking. Brady has always used a single switch to access a communication device to express himself. While he is incredibly proficient with his communication device, the limitations of pre-programmed vocabulary sometimes hindered Brady's ability to fully express himself and connect socially. 
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Bravo was created by parents of a son who has been using AAC for over 20 years. We've seen how Brady
                    and AAC have progressed together, but we knew there had to be a better way.
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
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">See Bravo in Action</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the power of AI-driven communication and see how Bravo gives users their true voice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 hover:border-orange-200 transition-colors">
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
                <Button className="bg-orange-600 hover:bg-orange-700 text-white" onClick={() => window.open("https://www.youtube.com/@TalkWithBravo", '_blank')}>Watch Videos</Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-orange-200 transition-colors">
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
                <Button
                  variant="outline"
                  className="border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent"
                  onClick={() => window.open(BRAVO_APP_URL, '_blank')}
                >
                  Launch Demo App
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Learn more about Bravo and how it revolutionizes AAC communication.</p>
          </div>

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

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience True Freedom of Expression?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join Brady and countless others who have found their authentic voice with Bravo's revolutionary AI-powered
            AAC technology.
          </p>
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

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
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
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
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
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2024 Talk With Bravo. Made with ❤️ for Brady and the AAC community.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}