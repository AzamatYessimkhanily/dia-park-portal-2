'use client'

import { Sidebar } from '@/components/dashboard/Sidebar'
import { TopBar } from '@/components/dashboard/TopBar'
import { DocumentsContent } from '@/components/documents/DocumentsContent'

export default function DocumentsPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--page-bg)' }}>
      <Sidebar activePath="/documents" />
      <TopBar breadcrumb="Документы" />
      <main className="ml-[260px] pt-16">
        <DocumentsContent />
      </main>
    </div>
  )
}
