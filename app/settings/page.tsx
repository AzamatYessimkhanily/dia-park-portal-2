'use client'

import { Sidebar } from '@/components/dashboard/Sidebar'
import { TopBar } from '@/components/dashboard/TopBar'
import { SettingsContent } from '@/components/settings/SettingsContent'

export default function SettingsPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--page-bg)' }}>
      <Sidebar activePath="/settings" />
      <TopBar breadcrumb="Настройки" />
      <main className="ml-[260px] pt-16">
        <SettingsContent />
      </main>
    </div>
  )
}
