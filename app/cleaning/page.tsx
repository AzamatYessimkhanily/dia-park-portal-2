'use client'

import { Sidebar } from '@/components/dashboard/Sidebar'
import { TopBar } from '@/components/dashboard/TopBar'
import { CleaningContent } from '@/components/cleaning/CleaningContent'

export default function CleaningPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--page-bg)' }}>
      <Sidebar activePath="/cleaning" />
      <TopBar breadcrumb="Клининг" />
      <main className="ml-[260px] pt-16">
        <CleaningContent />
      </main>
    </div>
  )
}
