import Head from 'next/head'

/* ---------------------------------------------------------------------------
   The lists below drive the page. While a list is empty its section renders an
   honest "being finalized" note instead of an empty table, so the page never
   implies a license has been cleared when it hasn't.

   APP_COMPONENTS  — from pubspec.yaml / pubspec.lock, licenses read from
                     ~/.pub-cache. Regenerate when dependencies change.
   WEB_COMPONENTS  — libraries the browser loads. Keep in step with the <script>
                     and <link> tags in static/*.html.
   SYMBOL_SETS     — empty on purpose: every symbol is our own work.
   VOICES          — empty on purpose: web uses speechSynthesis and Flutter uses
                     flutter_tts, so voices come from the operating system and
                     need no attribution here.
--------------------------------------------------------------------------- */

const SOURCE_REPO_URL = 'https://github.com/OSUBlakester/BravoGCPCopilot'
const LICENSE_NAME = 'Apache-2.0'
const SUPPORT_EMAIL = 'admin@talkwithbravo.com'
const LAST_UPDATED = 'September 1, 2026'

const APP_COMPONENTS = [
  { name: 'cloud_firestore', version: '5.6.11', license: 'BSD-3-Clause', url: 'https://pub.dev/packages/cloud_firestore' },
  { name: 'cupertino_icons', version: '1.0.8', license: 'MIT', url: 'https://pub.dev/packages/cupertino_icons' },
  { name: 'file_picker', version: '8.3.7', license: 'MIT', url: 'https://pub.dev/packages/file_picker' },
  { name: 'firebase_auth', version: '5.6.2', license: 'BSD-3-Clause', url: 'https://pub.dev/packages/firebase_auth' },
  { name: 'firebase_core', version: '3.15.1', license: 'BSD-3-Clause', url: 'https://pub.dev/packages/firebase_core' },
  { name: 'flutter_image_compress', version: '2.4.0', license: 'MIT', url: 'https://pub.dev/packages/flutter_image_compress' },
  { name: 'flutter_secure_storage', version: '9.2.4', license: 'BSD-3-Clause', url: 'https://pub.dev/packages/flutter_secure_storage' },
  { name: 'flutter_tts', version: '4.2.3', license: 'MIT', url: 'https://pub.dev/packages/flutter_tts' },
  { name: 'google_fonts', version: '6.2.1', license: 'Apache-2.0', url: 'https://pub.dev/packages/google_fonts' },
  { name: 'http', version: '1.4.0', license: 'BSD-3-Clause', url: 'https://pub.dev/packages/http' },
  { name: 'image_picker', version: '1.2.1', license: 'BSD-3-Clause', url: 'https://pub.dev/packages/image_picker' },
  { name: 'intl', version: '0.20.2', license: 'BSD-3-Clause', url: 'https://pub.dev/packages/intl' },
  { name: 'just_audio', version: '0.10.4', license: 'Apache-2.0', url: 'https://pub.dev/packages/just_audio' },
  { name: 'permission_handler', version: '11.4.0', license: 'MIT', url: 'https://pub.dev/packages/permission_handler' },
  { name: 'provider', version: '6.1.5', license: 'MIT', url: 'https://pub.dev/packages/provider' },
  { name: 'shared_preferences', version: '2.5.3', license: 'BSD-3-Clause', url: 'https://pub.dev/packages/shared_preferences' },
  { name: 'speech_to_text', version: '7.2.0', license: 'BSD-3-Clause', url: 'https://pub.dev/packages/speech_to_text' },
  { name: 'url_launcher', version: '6.3.2', license: 'BSD-3-Clause', url: 'https://pub.dev/packages/url_launcher' },
]

const WEB_COMPONENTS = [
  { name: 'Tailwind CSS', version: 'CDN', license: 'MIT', url: 'https://tailwindcss.com' },
  { name: 'Chart.js', version: 'CDN', license: 'MIT', url: 'https://www.chartjs.org' },
  { name: 'Quill', version: '1.3.6', license: 'BSD-3-Clause', url: 'https://quilljs.com' },
  { name: 'Font Awesome Free', version: '6.x', license: 'CC BY 4.0 (icons), SIL OFL 1.1 (fonts), MIT (code)', url: 'https://fontawesome.com/license/free' },
  { name: 'Google Fonts', version: 'CDN', license: 'SIL OFL 1.1 / Apache-2.0 by family', url: 'https://fonts.google.com/attribution' },
]

// Backend dependencies run only on our servers and are not distributed.
// The full pinned list is in requirements.txt in the public repository.
const OSS_COMPONENTS = [...APP_COMPONENTS, ...WEB_COMPONENTS]
// Use the licensor's required attribution wording verbatim, not a paraphrase.
// Every symbol in Bravo is original work created by Talk with Bravo, LLC and stored
// in our own Cloud Storage bucket. No third-party symbol set is used, so there is
// nothing to attribute here. Leave this empty unless that changes — and if a
// third-party set is ever added, its attribution wording is set by the licensor,
// not by us.
const SYMBOL_SETS = []

const VOICES = [
  // { source: 'Apple AVSpeechSynthesizer', license: 'Provided by the operating system', attribution: 'No attribution required' },
]

const GOOGLE_SERVICES = [
  { service: 'Firebase Authentication', purpose: 'Signing in to accounts' },
  { service: 'Cloud Firestore', purpose: 'Storing account and profile information' },
  { service: 'Cloud Run', purpose: 'Running the application' },
  { service: 'Vertex AI (Gemini)', purpose: 'Generating communication suggestions' },
]

/* ------------------------------------------------------------------------ */

const H2 = ({ children }) => (
  <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-2">{children}</h2>
)

const P = ({ children }) => <p className="mb-4 text-gray-700">{children}</p>

const A = ({ href, children }) => (
  <a
    href={href}
    className="text-orange-700 underline underline-offset-4 hover:text-orange-800"
  >
    {children}
  </a>
)

const Table = ({ headers, rows }) => (
  <div className="not-prose my-6 overflow-x-auto rounded-lg border border-gray-200">
    <table className="w-full min-w-[32rem] text-left text-sm">
      <thead className="bg-gray-50">
        <tr>
          {headers.map((h) => (
            <th
              key={h}
              className="px-4 py-3 font-semibold text-gray-900 border-b border-gray-200"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {rows.map((cells, i) => (
          <tr key={i} className="align-top">
            {cells.map((c, j) => (
              <td key={j} className="px-4 py-3 text-gray-700">
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const Pending = ({ what }) => (
  <div className="my-6 rounded-xl border-2 border-amber-300 bg-amber-50 p-6">
    <p className="text-sm font-bold uppercase tracking-[0.14em] text-amber-700">
      Being finalized
    </p>
    <p className="mt-3 text-gray-700">
      Our {what} is being completed and will be published here shortly. If you
      need this information in the meantime, email{' '}
      <A href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</A> and we will send
      it to you.
    </p>
  </div>
)

export default function Notices() {
  return (
    <>
      <Head>
        <title>Third-Party Notices | Talk With Bravo</title>
        <meta
          name="description"
          content="Third-party software, content and services used by Bravo, the open source AI-powered AAC application, with their licenses and attributions."
        />
      </Head>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
          Bravo
        </span>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
          Third-Party Notices
        </h1>
        <div className="mt-5 h-1 w-16 rounded-full bg-orange-600" />
        <div className="mt-6 text-lg text-gray-600">
          <p>
            The third-party software, content and services Bravo uses, with
            their licenses and required attributions.
          </p>
        </div>

        <div className="mt-10">
          <div className="prose prose-lg max-w-none">
            <P>
              <strong>Last updated:</strong> {LAST_UPDATED}
            </P>
            <P>
              This page is referenced from our{' '}
              <A href="/terms">Terms of Service</A> §12 and our{' '}
              <A href="/privacy">Privacy Policy</A> §5.1.
            </P>

            {/* 1 ------------------------------------------------------- */}
            <H2>1. Bravo itself</H2>
            <P>
              Bravo is open source. The source code is published at{' '}
              <A href={SOURCE_REPO_URL}>{SOURCE_REPO_URL}</A> under the{' '}
              <strong>{LICENSE_NAME}</strong> license. A copy of the license
              text is included in the repository at <code>LICENSE</code>.
            </P>
            <P>
              Our name, logo and brand are not covered by that license. See
              Terms of Service §12.
            </P>

            {/* 2 ------------------------------------------------------- */}
            <H2>2. Service providers</H2>
            <P>
              Bravo runs on Google Cloud Platform and uses the following Google
              services:
            </P>
            <Table
              headers={['Service', 'What we use it for']}
              rows={GOOGLE_SERVICES.map((g) => [g.service, g.purpose])}
            />
            <P>
              Google maintains a current list of its own sub-processors — the
              service providers it may in turn use — at{' '}
              <A href="https://cloud.google.com/terms/subprocessors">
                cloud.google.com/terms/subprocessors
              </A>
              . Our Privacy Policy §5.1 refers to this list.
            </P>
            <P>
              Google&rsquo;s handling of information we send it is governed by
              the Google Cloud Platform Terms of Service, the Service Specific
              Terms and the Cloud Data Processing Addendum.
            </P>

            {/* 3 ------------------------------------------------------- */}
            <H2>3. Open-source components</H2>
            <P>
              The following components are included in the Bravo apps or loaded
              by the Bravo website. Each is used under its own license.
            </P>
            <P>
              Bravo&rsquo;s server-side dependencies are not distributed &mdash;
              they run only on our own servers. The full pinned list is in{' '}
              <code>requirements.txt</code> in the{' '}
              <A href={SOURCE_REPO_URL}>source repository</A>.
            </P>
            {OSS_COMPONENTS.length > 0 ? (
              <Table
                headers={['Component', 'Version', 'License', 'Source']}
                rows={OSS_COMPONENTS.map((c) => [
                  c.name,
                  c.version,
                  c.license,
                  <A key={c.name} href={c.url}>
                    Source
                  </A>,
                ])}
              />
            ) : (
              <Pending what="list of open-source components" />
            )}

            {/* 4 ------------------------------------------------------- */}
            <H2>4. Symbols and images</H2>
            <P>
              The symbols and images in Bravo were created by us. We do not use a
              third-party symbol set, so there is no third-party attribution to
              give. The symbols remain our property and are not covered by the
              open-source license that applies to Bravo&rsquo;s source code.
            </P>
            {SYMBOL_SETS.length > 0 && (
              <Table
                headers={['Symbol set', 'License', 'Attribution']}
                rows={SYMBOL_SETS.map((s) => [s.name, s.license, s.attribution])}
              />
            )}

            {/* 5 ------------------------------------------------------- */}
            <H2>5. Speech voices</H2>
            <P>
              Bravo does not ship any speech voices of its own. It speaks using
              the voices already built into your browser, phone, or tablet, so
              the voice you hear is supplied by Apple, Google, or Microsoft as
              part of your operating system, and is governed by their terms
              rather than ours. You can change it in your device settings.
            </P>
            {VOICES.length > 0 && (
              <Table
                headers={['Voice source', 'License', 'Attribution']}
                rows={VOICES.map((v) => [v.source, v.license, v.attribution])}
              />
            )}

            {/* 6 ------------------------------------------------------- */}
            <H2>6. Reporting a problem with this page</H2>
            <P>
              If you believe a component is used without proper attribution, or
              a license is misstated, please contact us at{' '}
              <A href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</A> and we
              will correct it.
            </P>
          </div>
        </div>
      </main>
    </>
  )
}
