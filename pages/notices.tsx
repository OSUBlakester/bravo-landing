import LegalLayout, { UnderConstruction } from "@/components/legal-layout"

export default function ThirdPartyNotices() {
  return (
    <LegalLayout
      title="Third-Party Notices"
      heading="Third-Party Notices"
      intro={
        <p>
          Bravo is built on open source software. This page lists the third-party components we use and their license
          terms.
        </p>
      }
    >
      <UnderConstruction document="third-party notices list" />
    </LegalLayout>
  )
}
