'use client'

import { useState } from 'react'
import { 
  Search,
  Plus,
  FileText,
  File,
  FolderOpen,
  Download,
  Eye,
  MoreHorizontal,
  Calendar,
  Clock,
  AlertCircle,
  Filter,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const documents = [
  { id: 1, name: 'Договор аренды — ТОО Альянс-Trade', type: 'contract', category: 'Договоры', date: '15.01.2024', expires: '15.01.2027', size: '2.4 MB', status: 'active' },
  { id: 2, name: 'Договор аренды — ТОО DataCom', type: 'contract', category: 'Договоры', date: '01.03.2024', expires: '01.03.2026', size: '1.8 MB', status: 'expiring' },
  { id: 3, name: 'Акт выполненных работ №147', type: 'act', category: 'Акты', date: '20.05.2026', expires: null, size: '156 KB', status: 'active' },
  { id: 4, name: 'Счёт на оплату №2026-0542', type: 'invoice', category: 'Счета', date: '18.05.2026', expires: '25.05.2026', size: '89 KB', status: 'active' },
  { id: 5, name: 'Инструкция по пожарной безопасности', type: 'instruction', category: 'Инструкции', date: '10.01.2026', expires: '10.01.2027', size: '4.2 MB', status: 'active' },
  { id: 6, name: 'Регламент работы охраны', type: 'regulation', category: 'Регламенты', date: '05.02.2026', expires: null, size: '1.1 MB', status: 'active' },
  { id: 7, name: 'Чек-лист уборки санузлов', type: 'checklist', category: 'Чек-листы', date: '12.03.2026', expires: null, size: '234 KB', status: 'active' },
  { id: 8, name: 'Договор на обслуживание лифтов', type: 'contract', category: 'Договоры', date: '01.06.2025', expires: '01.06.2026', size: '3.1 MB', status: 'expiring' },
  { id: 9, name: 'Правила внутреннего распорядка', type: 'regulation', category: 'Регламенты', date: '01.01.2026', expires: null, size: '890 KB', status: 'active' },
  { id: 10, name: 'Шаблон заявления на пропуск', type: 'template', category: 'Шаблоны', date: '15.04.2026', expires: null, size: '45 KB', status: 'active' },
]

const categories = ['Все', 'Договоры', 'Акты', 'Счета', 'Инструкции', 'Регламенты', 'Чек-листы', 'Шаблоны']

const typeIcons: Record<string, { bg: string; color: string }> = {
  contract: { bg: 'var(--status-info-bg)', color: 'var(--status-info-main)' },
  act: { bg: 'var(--dia-green-50)', color: 'var(--dia-green-600)' },
  invoice: { bg: 'var(--status-warning-bg)', color: 'var(--status-warning-main)' },
  instruction: { bg: '#FEF0EC', color: 'var(--priority-high)' },
  regulation: { bg: 'var(--neutral-100)', color: 'var(--neutral-600)' },
  checklist: { bg: 'var(--dia-green-50)', color: 'var(--dia-green-600)' },
  template: { bg: 'var(--neutral-100)', color: 'var(--neutral-600)' },
}

export function DocumentsContent() {
  const [activeCategory, setActiveCategory] = useState('Все')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'Все' || doc.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const expiringCount = documents.filter(d => d.status === 'expiring').length

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-display)' }}>
            Документы
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--neutral-500)' }}>
            {documents.length} документов · {expiringCount} истекают скоро
          </p>
        </div>
        <Button style={{ background: 'var(--dia-green-600)' }} className="text-white gap-2">
          <Plus size={16} strokeWidth={1.5} />
          Загрузить документ
        </Button>
      </div>

      {/* Warning for expiring */}
      {expiringCount > 0 && (
        <div 
          className="mb-6 p-4 rounded-xl border flex items-center gap-3"
          style={{ background: 'var(--status-warning-bg)', borderColor: 'var(--status-warning-main)' }}
        >
          <AlertCircle size={20} strokeWidth={1.5} style={{ color: 'var(--status-warning-main)' }} />
          <div>
            <div className="font-medium text-sm" style={{ color: 'var(--status-warning-main)' }}>
              {expiringCount} документа истекают в ближайшие 30 дней
            </div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--neutral-600)' }}>
              Рекомендуется обновить договоры заранее
            </div>
          </div>
        </div>
      )}

      {/* Search & Categories */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--neutral-400)' }} />
          <Input 
            placeholder="Поиск документов..." 
            className="pl-9 h-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ background: 'var(--neutral-0)', borderColor: 'var(--neutral-300)' }}
          />
        </div>
      </div>

      {/* Categories Tabs */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-3 py-1.5 rounded-lg text-sm transition-colors border"
            style={{
              background: activeCategory === cat ? 'var(--dia-green-600)' : 'var(--neutral-0)',
              color: activeCategory === cat ? 'white' : 'var(--neutral-600)',
              borderColor: activeCategory === cat ? 'var(--dia-green-600)' : 'var(--neutral-300)',
              fontWeight: activeCategory === cat ? 500 : 400,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredDocs.map((doc) => {
          const typeStyle = typeIcons[doc.type]
          return (
            <div
              key={doc.id}
              className="p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md"
              style={{ background: 'var(--neutral-0)', borderColor: doc.status === 'expiring' ? 'var(--status-warning-main)' : 'var(--neutral-200)' }}
            >
              <div className="flex items-start gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: typeStyle.bg }}
                >
                  <FileText size={18} strokeWidth={1.5} style={{ color: typeStyle.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate" style={{ color: 'var(--neutral-900)' }}>{doc.name}</div>
                  <div className="flex items-center gap-2 mt-1 text-xs" style={{ color: 'var(--neutral-500)' }}>
                    <span>{doc.category}</span>
                    <span>·</span>
                    <span>{doc.size}</span>
                  </div>
                </div>
                <button className="p-1.5 rounded-lg hover:bg-[var(--neutral-100)] transition-colors shrink-0">
                  <MoreHorizontal size={16} strokeWidth={1.5} style={{ color: 'var(--neutral-500)' }} />
                </button>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-3 border-t" style={{ borderColor: 'var(--neutral-200)' }}>
                <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--neutral-500)' }}>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} strokeWidth={1.5} />
                    {doc.date}
                  </span>
                  {doc.expires && (
                    <span 
                      className="flex items-center gap-1"
                      style={{ color: doc.status === 'expiring' ? 'var(--status-warning-main)' : 'var(--neutral-500)' }}
                    >
                      <Clock size={12} strokeWidth={1.5} />
                      до {doc.expires}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-[var(--neutral-100)] transition-colors">
                    <Eye size={14} strokeWidth={1.5} style={{ color: 'var(--neutral-500)' }} />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-[var(--neutral-100)] transition-colors">
                    <Download size={14} strokeWidth={1.5} style={{ color: 'var(--neutral-500)' }} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
