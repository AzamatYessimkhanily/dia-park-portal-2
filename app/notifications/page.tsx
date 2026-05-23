'use client'

import { Sidebar } from '@/components/dashboard/Sidebar'
import { TopBar } from '@/components/dashboard/TopBar'
import { NotificationsContent } from '@/components/notifications/NotificationsContent'

export default function NotificationsPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--page-bg)' }}>
      <Sidebar activePath="/notifications" />
      <TopBar breadcrumb="Уведомления" />
      <main className="ml-[260px] pt-16">
        <NotificationsContent />
      </main>
    </div>
  )
}
