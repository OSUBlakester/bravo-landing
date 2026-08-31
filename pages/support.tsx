import LegalLayout from "@/components/legal-layout"

const GITHUB_ISSUES_URL = "https://github.com/OSUBlakester/BravoGCPCopilot/issues"
const YOUTUBE_URL = "https://www.youtube.com/@TalkWithBravo"

export default function Support() {
  return (
    <LegalLayout
      title="Support"
      heading="Bravo Support"
      intro={
        <p>
          Need help with Bravo? Email us or send a message with the form below and we will get back to you. Bravo is free
          and open source, and support is free too.
        </p>
      }
    >
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Contact us directly</h2>
          <p className="mt-3 text-gray-600">
            Email{" "}
            <a
              href="mailto:admin@talkwithbravo.com"
              className="font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800"
            >
              admin@talkwithbravo.com
            </a>{" "}
            and we will respond as quickly as we can, typically within two business days.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-gray-900">Other resources</h2>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-700 underline underline-offset-4 hover:text-orange-800"
              >
                Video tutorials and demos on YouTube
              </a>
            </li>
            <li>
              <a
                href={GITHUB_ISSUES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-700 underline underline-offset-4 hover:text-orange-800"
              >
                Report a bug or request a feature on GitHub
              </a>
            </li>
            <li>
              <a href="/#faq" className="text-orange-700 underline underline-offset-4 hover:text-orange-800">
                Frequently asked questions
              </a>
            </li>
          </ul>

          <p className="mt-8 text-sm text-gray-500">
            If you are reporting a problem, it helps to tell us your device and operating system, the profile you were
            using, and what you expected to happen.
          </p>
        </div>

        <form
          action="https://formspree.io/f/xqadarrp"
          method="POST"
          className="rounded-xl border-2 border-orange-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-5">Send us a message</h2>
          <input type="hidden" name="source" value="support-page" />
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="topic" className="block text-gray-700 font-medium mb-2">
              How can we help?
            </label>
            <select
              id="topic"
              name="topic"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
            >
              <option value="Getting started">Getting started</option>
              <option value="Account or login issue">Account or login issue</option>
              <option value="Bug report">Bug report</option>
              <option value="Feature request">Feature request</option>
              <option value="Accessibility">Accessibility</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </LegalLayout>
  )
}
