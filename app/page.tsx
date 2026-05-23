import { Sidebar }        from '@/components/dashboard/Sidebar'
import { TopBar }         from '@/components/dashboard/TopBar'
import { PageHeader }     from '@/components/dashboard/PageHeader'
import { KpiRow }         from '@/components/dashboard/KpiRow'
import { AiInsights }     from '@/components/dashboard/AiInsights'
import { UrgentTasks }    from '@/components/dashboard/UrgentTasks'
import { FinanceChart }   from '@/components/dashboard/FinanceChart'
import { BuildingStatus } from '@/components/dashboard/BuildingStatus'
import { StaffActivity }  from '@/components/dashboard/StaffActivity'
import { EventsTimeline } from '@/components/dashboard/EventsTimeline'

export default function DashboardPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--neutral-50)' }}>
      <Sidebar />
      <TopBar />

      {/* Main content area */}
      <main className="ml-[260px] pt-16">
        <div className="px-6 py-6 max-w-[1400px] mx-auto flex flex-col gap-5">

          {/* Page header */}
          <PageHeader />

          {/* KPI Row */}
          <KpiRow />

          {/* AI Insights */}
          <AiInsights />

          {/* Main 2-column grid */}
          <div className="grid gap-5" style={{ gridTemplateColumns: '1fr 380px' }}>

            {/* LEFT column */}
            <div className="flex flex-col gap-5">
              <UrgentTasks />
              <FinanceChart />
            </div>

            {/* RIGHT column */}
            <div className="flex flex-col gap-5">
              <BuildingStatus />
              <StaffActivity />
              <EventsTimeline />
            </div>

          </div>

        </div>
      </main>
    </div>
  )
}
