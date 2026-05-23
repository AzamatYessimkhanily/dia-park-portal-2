'use client'

import { Sidebar } from '@/components/dashboard/Sidebar'
import { TopBar } from '@/components/dashboard/TopBar'
import { ResidentsContent } from '@/components/residents/ResidentsContent'

export default function ResidentsPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--page-bg)' }}>
      <Sidebar activePath="/residents" />
      <TopBar breadcrumb="Резиденты" />
      <main className="ml-[260px] pt-16">
        <ResidentsContent />
      </main>
    </div>
  )
}
