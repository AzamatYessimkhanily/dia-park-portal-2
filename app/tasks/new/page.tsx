'use client'

import { Sidebar } from '@/components/dashboard/Sidebar'
import { TopBar } from '@/components/dashboard/TopBar'
import { NewTaskContent } from '@/components/tasks/NewTaskContent'

export default function NewTaskPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--page-bg)' }}>
      <Sidebar activePath="/tasks" />
      <TopBar breadcrumb="Заявки / Новая заявка" />
      <main className="ml-[260px] pt-16">
        <NewTaskContent />
      </main>
    </div>
  )
}
