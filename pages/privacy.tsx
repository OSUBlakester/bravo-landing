import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Talk With Bravo</title>
      </Head>
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">
          <strong>Effective Date:</strong> September 3, 2025
        </p>
        <p className="mb-4">
          Talk With Bravo respects your privacy. Our app uses your device’s microphone solely to identify a wake word. We do <strong>not</strong> record, store, or transmit any audio data from your microphone.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">Information We Collect</h2>
        <p className="mb-4">
          We do not collect or store any personal information or audio recordings from your device’s microphone.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">How We Use Your Information</h2>
        <p className="mb-4">
          The microphone is used only for real-time wake word detection. No audio is saved or sent to our servers.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at <a href="mailto:admin@talkwithbravo.com" className="text-orange-600">admin@talkwithbravo.com</a>.
        </p>
      </main>
    </>
  );
}
