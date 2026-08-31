import LegalLayout from "@/components/legal-layout"

export default function PrivacyPolicy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      heading="Privacy Policy"
      intro={
        <p>
          <strong>Effective Date:</strong> September 3, 2025
        </p>
      }
    >
      <div className="prose prose-lg max-w-none">
        <p className="mb-4 text-gray-700">
          Talk With Bravo respects your privacy. Our app uses your device&rsquo;s microphone solely to identify a wake
          word. We do <strong>not</strong> record, store, or transmit any audio data from your microphone.
        </p>
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">Information We Collect</h2>
        <p className="mb-4 text-gray-700">
          We do not collect or store any personal information or audio recordings from your device&rsquo;s microphone.
        </p>
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">How We Use Your Information</h2>
        <p className="mb-4 text-gray-700">
          The microphone is used only for real-time wake word detection. No audio is saved or sent to our servers.
        </p>
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">Third-Party Components</h2>
        <p className="mb-4 text-gray-700">
          Bravo is built on open source software. See our{" "}
          <a href="/notices" className="text-orange-700 underline underline-offset-4 hover:text-orange-800">
            third-party notices
          </a>{" "}
          for the components we use and their license terms.
        </p>
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions about this Privacy Policy, please contact us at{" "}
          <a
            href="mailto:admin@talkwithbravo.com"
            className="text-orange-700 underline underline-offset-4 hover:text-orange-800"
          >
            admin@talkwithbravo.com
          </a>
          .
        </p>
      </div>
    </LegalLayout>
  )
}
