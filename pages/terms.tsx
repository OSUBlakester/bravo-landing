import LegalLayout, { UnderConstruction } from "@/components/legal-layout"

export default function TermsOfService() {
  return (
    <LegalLayout
      title="Terms of Service"
      heading="Terms of Service"
      intro={
        <p>
          The terms that govern your use of Bravo, our open source AI-powered AAC application, and the talkwithbravo.com
          website.
        </p>
      }
    >
      <UnderConstruction document="Terms of Service" />
    </LegalLayout>
  )
}
