import { Metadata } from "next"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { TopBar } from "@/components/dashboard/TopBar"
import { SecurityContent } from "@/components/security/SecurityContent"

export const metadata: Metadata = {
  title: "Охрана и безопасность | DIA Park",
  description: "Панель охраны и безопасности DIA Park",
}

export default function SecurityPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--neutral-50)' }}>
      <Sidebar activePath="/security" />
      <TopBar breadcrumb={[
        { label: "DIA Park", href: "/" },
        { label: "Охрана и безопасность" }
      ]} />
      
      <main className="ml-[260px] pt-16">
        <SecurityContent />
      </main>
    </div>
  )
}
