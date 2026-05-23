import { Sidebar } from "@/components/dashboard/Sidebar"
import { TopBar } from "@/components/dashboard/TopBar"
import { CommunicationContent } from "@/components/communication/CommunicationContent"

export default function CommunicationPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--neutral-50)' }}>
      <Sidebar activePath="/communication" />
      <TopBar breadcrumb={[
        { label: "DIA Park", href: "/" },
        { label: "Коммуникация" }
      ]} />
      
      <main className="ml-[260px] pt-16 h-screen">
        <CommunicationContent />
      </main>
    </div>
  )
}
