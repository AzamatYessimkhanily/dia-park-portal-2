'use client'

import { Sidebar } from '@/components/dashboard/Sidebar'
import { TopBar } from '@/components/dashboard/TopBar'
import { StaffContent } from '@/components/staff/StaffContent'

export default function StaffPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--page-bg)' }}>
      <Sidebar activePath="/staff" />
      <TopBar breadcrumb="Сотрудники" />
      <main className="ml-[260px] pt-16">
        <StaffContent />
      </main>
    </div>
  )
}
