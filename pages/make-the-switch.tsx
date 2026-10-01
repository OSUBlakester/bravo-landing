import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Printer, Cpu, Wrench, Zap, Keyboard, Scale, AlertTriangle, Github } from "lucide-react"
import partsData from "@/lib/make-the-switch-parts.json"

const BUNDLE = "/make-the-switch/files/make-the-switch-bravo.zip"
const CIRCUITPYTHON_UF2 = "/make-the-switch/files/adafruit-circuitpython-waveshare_rp2040_zero-en_US-9.2.8.uf2"
const CIRCUITPYTHON_UPSTREAM = "https://circuitpython.org/board/waveshare_rp2040_zero/"
const TACTILE_SWITCH_SEARCH = "https://www.amazon.com/s?k=6x6x5mm+momentary+tactile+push+button+2+pin"
const RP2040_ZERO_SEARCH = "https://www.amazon.com/s?k=rp2040+zero"

const PART_NOTES: Record<string, string> = {
  base: "Holds the RP2040-Zero. The flange has three mounting holes so it can be screwed to a standard switch mount, and a cutout in the wall for the USB cable.",
  "button-housing": "Holds the tactile button. Screws down onto the three posts in the Base, and the Cap Holder's four stems pass up through it.",
  "cap-holder": "Carries the Cap on a threaded boss. Its four stems pass through the Button Housing so the whole top can travel up and down when pressed.",
  bolts: "Four of them, printed together. Each screws onto one of the Cap Holder's stems, holding the assembly together while still letting it move.",
  cap: "The surface the user actually presses. Print this one in their favourite colour, and smooth if your printer can manage it.",
}

const STEPS = [
  {
    icon: Printer,
    title: "Print the five parts",
    body: "All five print flat with no supports needed. The Cap and Cap Holder have threads, so print those slowly — a 0.2 mm layer height and a slower outer-wall speed give the cleanest threads. PLA or PETG both work.",
  },
  {
    icon: Cpu,
    title: "Solder two wires to the board",
    body: "Solder a short length of wire from each pole of the tactile switch to the RP2040-Zero: one to GND, one to GP1. It does not matter which pole goes to which — the switch is just closing a circuit.",
  },
  {
    icon: Zap,
    title: "Flash CircuitPython",
    body: "Hold BOOT on the RP2040-Zero while plugging it in. It appears as a USB drive called RPI-RP2. Copy the CircuitPython .uf2 onto it; the board reboots as a drive called CIRCUITPY.",
  },
  {
    icon: Keyboard,
    title: "Copy the switch files",
    body: "Copy boot.py, code.py and the lib folder onto CIRCUITPY. The board restarts and is now a keyboard: pressing the button sends a spacebar.",
  },
  {
    icon: Wrench,
    title: "Assemble the housing",
    body: "Seat the button in the Button Housing and the board in the Base, then screw the Button Housing onto the Base's three posts. Push the Cap Holder's four stems through the Button Housing and screw a printed bolt onto each. Screw the Cap onto the Cap Holder.",
  },
]

export default function MakeTheSwitch() {
  const parts = partsData.parts

  return (
    <>
      <Head>
        <title>Make the Switch to Bravo | Talk With Bravo</title>
        <meta
          name="description"
          content="Free, open-source 3D-printable plans for an accessibility switch that works with Bravo and any other app, toy or device that takes a keyboard."
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

        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-50 to-blue-50 py-16 border-b border-orange-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
              <Printer className="h-4 w-4" />
              Open Hardware
            </span>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">Make the Switch to Bravo</h1>
            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-orange-600" />
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              A 3D-printable accessibility switch you can build yourself. It plugs in over USB and acts as a keyboard,
              so it works with Bravo &mdash; and with any other app, toy or device that responds to a key press.
            </p>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Commercial AAC switches often cost more than they should. Every file here is free, and the design is
              yours to print, change and share.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={BUNDLE}
                className="inline-flex items-center justify-center rounded-md bg-orange-600 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              >
                <Download className="mr-2 h-5 w-5" />
                Download everything (1 MB)
              </a>
              <a
                href="#parts"
                className="inline-flex items-center justify-center rounded-md border-2 border-gray-900 px-8 py-3 text-base font-medium text-gray-900 transition-colors hover:bg-gray-100"
              >
                See the parts
              </a>
            </div>
          </div>
        </section>

        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* What you need */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">What you will need</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <Card className="h-full border-2 border-orange-200 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900">Printed parts</h3>
                  <ul className="mt-3 space-y-1 text-gray-600 text-sm leading-relaxed">
                    <li>&bull; All five STL files below</li>
                    <li>&bull; PLA or PETG, any colour</li>
                    <li>&bull; Roughly 30 g of filament in total</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="h-full border-2 border-orange-200 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900">Electronics</h3>
                  <ul className="mt-3 space-y-1 text-gray-600 text-sm leading-relaxed">
                    <li>
                      &bull;{" "}
                      <a
                        href={RP2040_ZERO_SEARCH}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-700 underline underline-offset-4 hover:text-orange-800"
                      >
                        Waveshare RP2040-Zero board
                      </a>
                    </li>
                    <li>
                      &bull;{" "}
                      <a
                        href={TACTILE_SWITCH_SEARCH}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-700 underline underline-offset-4 hover:text-orange-800"
                      >
                        6 &times; 6 &times; 5 mm 2-pin momentary tactile button
                      </a>
                    </li>
                    <li>&bull; A few cm of thin wire (22&ndash;26 AWG)</li>
                    <li>&bull; A USB-C cable</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="h-full border-2 border-orange-200 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900">Screws</h3>
                  <ul className="mt-3 space-y-1 text-gray-600 text-sm leading-relaxed">
                    <li>&bull; 3 self-tapping screws to join the Button Housing to the Base (&#8960;3.0 mm bores, 7.2 mm deep)</li>
                    <li>&bull; Metal screws to suit your switch mount (3 &times; &#8960;3.8 mm mounting holes)</li>
                  </ul>
                  <p className="mt-3 text-xs text-gray-500">
                    Hole sizes are measured from the models, so you can match screws you already have.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Parts */}
          <section id="parts" className="mt-16 scroll-mt-20">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">The printed parts</h2>
            <p className="mt-3 text-gray-600">
              Five parts, printed separately. Dimensions are taken straight from the models.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {parts.map((part) => (
                <Card key={part.slug} className="h-full border-2 border-orange-200 bg-white shadow-sm">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="rounded-lg bg-gradient-to-br from-orange-50 to-blue-50 p-3">
                      <Image
                        src={part.image}
                        alt={`3D view of the ${part.name}`}
                        width={900}
                        height={900}
                        className="h-40 w-full object-contain"
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">{part.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {part.dimensions.x} &times; {part.dimensions.y} &times; {part.dimensions.z} mm
                    </p>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{PART_NOTES[part.slug]}</p>
                    <a
                      href={part.stl}
                      className="mt-4 inline-flex items-center font-medium text-orange-700 hover:text-orange-800"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {part.slug}.stl
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Build steps */}
          <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Building it</h2>
            <ol className="mt-8 space-y-6">
              {STEPS.map((step, i) => (
                <li key={step.title}>
                  <Card className="border-2 border-gray-200 shadow-sm">
                    <CardContent className="flex gap-5 p-6">
                      <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-orange-100">
                        <step.icon className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          <span className="text-orange-600">{i + 1}.</span> {step.title}
                        </h3>
                        <p className="mt-2 text-gray-600 leading-relaxed">{step.body}</p>
                      </div>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ol>
          </section>

          {/* Wiring */}
          <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Wiring</h2>
            <div className="mt-6 rounded-xl border-2 border-orange-200 bg-orange-50 p-6">
              <p className="text-gray-800">
                The tactile button has two poles. Solder one to <code className="rounded bg-white px-1.5 py-0.5 font-mono text-sm text-orange-700">GND</code>{" "}
                on the RP2040-Zero and the other to{" "}
                <code className="rounded bg-white px-1.5 py-0.5 font-mono text-sm text-orange-700">GP1</code>.
              </p>
              <p className="mt-3 text-gray-700">
                It does not matter which pole goes to which pad. The firmware holds GP1 high with an internal pull-up
                and watches for it being pulled down to ground, so the button is only closing a circuit.
              </p>
            </div>
          </section>

          {/* Firmware */}
          <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">The firmware</h2>
            <p className="mt-3 text-gray-600">
              The board runs CircuitPython. Three things go onto it, all included in the download.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                {
                  name: "CircuitPython 9.2.8",
                  note: "Flashed once, by copying the .uf2 onto the board while it is in bootloader mode.",
                  href: CIRCUITPYTHON_UF2,
                  label: "waveshare_rp2040_zero 9.2.8.uf2",
                },
                {
                  name: "boot.py",
                  note: "Tells the board to present itself as a keyboard only, which is what keeps it compatible with Android.",
                  href: "/make-the-switch/files/boot.py",
                  label: "boot.py",
                },
                {
                  name: "code.py",
                  note: "Watches the button, debounces it, and sends the key press. Runs every time the board powers up.",
                  href: "/make-the-switch/files/code.py",
                  label: "code.py",
                },
              ].map((f) => (
                <Card key={f.name} className="h-full border-2 border-gray-200 shadow-sm">
                  <CardContent className="flex h-full flex-col p-6">
                    <h3 className="font-semibold text-gray-900">{f.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{f.note}</p>
                    <a href={f.href} className="mt-4 inline-flex items-center text-sm font-medium text-orange-700 hover:text-orange-800">
                      <Download className="mr-2 h-4 w-4" />
                      {f.label}
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="mt-4 text-sm text-gray-500">
              The <code className="font-mono">lib</code> folder in the download holds the Adafruit HID library the code
              depends on &mdash; copy it across too. Newer CircuitPython builds are at{" "}
              <a
                href={CIRCUITPYTHON_UPSTREAM}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-700 underline underline-offset-4 hover:text-orange-800"
              >
                circuitpython.org
              </a>
              ; 9.2.8 is the version this switch was built and tested with.
            </p>
          </section>

          {/* Send a different key */}
          <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Sending a different key</h2>
            <p className="mt-3 text-gray-600">
              The switch sends a spacebar by default. Many scanning interfaces use Tab instead. To change it, open{" "}
              <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm">code.py</code> in any text editor and
              replace the two occurrences of <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm">Keycode.SPACE</code>:
            </p>
            <pre className="mt-4 overflow-x-auto rounded-xl border-2 border-gray-200 bg-gray-900 p-5 text-sm leading-relaxed text-gray-100">
              <code>{`keyboard.press(Keycode.SPACE)      ->  keyboard.press(Keycode.TAB)
keyboard.release(Keycode.SPACE)    ->  keyboard.release(Keycode.TAB)`}</code>
            </pre>
            <p className="mt-4 text-gray-600">
              Save the file straight onto the CIRCUITPY drive and the board restarts with the new key. Any other key
              works the same way &mdash; <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm">Keycode.ENTER</code>,{" "}
              <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm">Keycode.A</code>, and so on.
            </p>
          </section>

          {/* Licence and safety */}
          <section className="mt-16 grid gap-6 md:grid-cols-2">
            <Card className="h-full border-2 border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Scale className="h-5 w-5 text-orange-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Licence</h2>
                </div>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  These files are released under{" "}
                  <a
                    href="https://creativecommons.org/licenses/by-sa/4.0/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-700 underline underline-offset-4 hover:text-orange-800"
                  >
                    CC BY-SA 4.0
                  </a>
                  . Print them, change them, sell them if you like &mdash; just credit Make the Switch to Bravo and
                  release your changes under the same licence so the next person benefits too.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full border-2 border-amber-300 bg-amber-50 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-700" />
                  <h2 className="text-lg font-semibold text-gray-900">Before you build</h2>
                </div>
                <p className="mt-3 text-gray-700 leading-relaxed">
                  This is a DIY project, not a medical device, and it is offered with no warranty. Soldering is involved,
                  so an adult should do the build. Small printed parts can be a choking hazard before assembly. Check
                  that the finished switch suits the person using it &mdash; a therapist or AAC specialist is the right
                  person to ask.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Download */}
          <section className="mt-16 rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-blue-50 p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Get the files</h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              One download with all five STL files, the CircuitPython firmware, and the switch code.
            </p>
            <a
              href={BUNDLE}
              className="mt-8 inline-flex items-center justify-center rounded-md bg-orange-600 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-orange-700"
            >
              <Download className="mr-2 h-5 w-5" />
              Download everything (1 MB)
            </a>
            <p className="mt-6 text-sm text-gray-600">
              Built something, or improved the design? We would love to hear about it &mdash;{" "}
              <a href="/support" className="text-orange-700 underline underline-offset-4 hover:text-orange-800">
                get in touch
              </a>
              .
            </p>
          </section>
        </main>

        <footer className="bg-gray-900 text-white py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              <Link href="/bravo-university" className="text-gray-400 hover:text-white transition-colors">Bravo University</Link>
              <Link href="/support" className="text-gray-400 hover:text-white transition-colors">Support</Link>
              <a
                href="https://github.com/OSUBlakester/BravoGCPCopilot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                Bravo on GitHub
              </a>
            </nav>
            <p className="text-gray-500 text-sm mt-6">
              &copy; 2026 Talk With Bravo. Hardware files under CC BY-SA 4.0.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
