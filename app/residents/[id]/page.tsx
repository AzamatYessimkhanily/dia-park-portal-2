import { Sidebar } from "@/components/dashboard/Sidebar"
import { TopBar } from "@/components/dashboard/TopBar"
import { ResidentDetailContent } from "@/components/residents/ResidentDetailContent"

export const metadata = {
  title: "ТОО Альянс-Trade — DIA Park",
  description: "Карточка резидента",
}

export default function ResidentDetailPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--neutral-50)' }}>
      <Sidebar activePath="/residents" />
      <TopBar breadcrumb={[
        { label: "Резиденты", href: "/residents" },
        { label: "ТОО Альянс-Trade" }
      ]} />
      <main className="ml-[260px] pt-16">
        <div className="p-6">
          <ResidentDetailContent />
        </div>
      </main>
    </div>
  )
}
