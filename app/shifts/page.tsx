'use client'

import { Sidebar } from '@/components/dashboard/Sidebar'
import { TopBar } from '@/components/dashboard/TopBar'
import { ShiftsContent } from '@/components/shifts/ShiftsContent'

export default function ShiftsPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--page-bg)' }}>
      <Sidebar activePath="/shifts" />
      <TopBar breadcrumb="Смены и журнал" />
      <main className="ml-[260px] pt-16">
        <ShiftsContent />
      </main>
    </div>
  )
}
