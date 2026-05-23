import { Sidebar } from "@/components/dashboard/Sidebar"
import { TopBar } from "@/components/dashboard/TopBar"
import { AnalyticsContent } from "@/components/analytics/AnalyticsContent"

export const metadata = {
  title: "ИИ-аналитика | DIA Park",
  description: "Еженедельные отчёты, инсайты и рекомендации на основе данных портала",
}

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-page">
      <Sidebar activePath="/analytics" />
      <div className="flex-1 ml-[260px]">
        <TopBar 
          breadcrumb={[
            { label: "ИИ-аналитика" }
          ]} 
        />
        <main className="pt-16">
          <AnalyticsContent />
        </main>
      </div>
    </div>
  )
}
