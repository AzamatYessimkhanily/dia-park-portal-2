'use client'

import { Sidebar } from '@/components/dashboard/Sidebar'
import { TopBar } from '@/components/dashboard/TopBar'
import { MaintenanceContent } from '@/components/maintenance/MaintenanceContent'

export default function MaintenancePage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--page-bg)' }}>
      <Sidebar activePath="/maintenance" />
      <TopBar breadcrumb="Техническая служба" />
      <main className="ml-[260px] pt-16">
        <MaintenanceContent />
      </main>
    </div>
  )
}
