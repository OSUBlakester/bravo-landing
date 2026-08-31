import LegalLayout, { UnderConstruction } from "@/components/legal-layout"

export default function Eula() {
  return (
    <LegalLayout
      title="End User License Agreement"
      heading="End User License Agreement"
      intro={<p>The license agreement covering your installation and use of the Bravo application.</p>}
    >
      <UnderConstruction document="End User License Agreement" />
    </LegalLayout>
  )
}
