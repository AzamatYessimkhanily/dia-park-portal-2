import { Sidebar } from "@/components/dashboard/Sidebar"
import { TopBar } from "@/components/dashboard/TopBar"
import { FinanceContent } from "@/components/finance/FinanceContent"

export const metadata = {
  title: "Финансы | DIA Park",
  description: "Финансовый дашборд объекта",
}

export default function FinancePage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--neutral-50)' }}>
      <Sidebar activePath="/finance" />
      <TopBar
        breadcrumb={[
          { label: "DIA Park", href: "/" },
          { label: "Финансы" },
        ]}
      />
      <main className="ml-[260px] pt-16">
        <div className="p-6">
          <FinanceContent />
        </div>
      </main>
    </div>
  )
}
