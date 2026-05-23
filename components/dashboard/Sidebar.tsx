'use client'

import Link from 'next/link'
import {
  LayoutDashboard,
  ClipboardList,
  MessageSquare,
  CalendarClock,
  Wrench,
  Sparkles as SparklesBrush,
  Shield,
  Users,
  DollarSign,
  Bot,
  UserCheck,
  FileText,
  Bell,
  Settings,
  ChevronDown,
  Building2,
} from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Дашборд', href: '/' },
  { icon: ClipboardList,   label: 'Заявки и задачи', href: '/tasks', badge: '12', badgeType: 'count' },
  { icon: MessageSquare,   label: 'Коммуникация', href: '/communication', badge: '•',  badgeType: 'dot' },
  { icon: CalendarClock,   label: 'Смены и журнал', href: '/shifts' },
  { icon: Wrench,          label: 'Техническая служба', href: '/maintenance' },
  { icon: SparklesBrush,   label: 'Клининг', href: '/cleaning' },
  { icon: Shield,          label: 'Охрана', href: '/security' },
  { icon: Users,           label: 'Резиденты', href: '/residents' },
  { icon: DollarSign,      label: 'Финансы', href: '/finance' },
  { icon: Bot,             label: 'ИИ-аналитика', href: '/ai-analytics', badge: 'AI', badgeType: 'ai' },
  { icon: UserCheck,       label: 'Сотрудники', href: '/staff' },
  { icon: FileText,        label: 'Документы', href: '/documents' },
  { icon: Bell,            label: 'Уведомления', href: '/notifications' },
  { icon: Settings,        label: 'Настройки', href: '/settings' },
]

interface SidebarProps {
  activePath?: string
}

export function Sidebar({ activePath = '/' }: SidebarProps) {
  return (
    <aside
      className="fixed left-0 top-0 h-screen w-[260px] flex flex-col border-r"
      style={{
        background: 'var(--neutral-0)',
        borderColor: 'var(--neutral-200)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b shrink-0" style={{ borderColor: 'var(--neutral-200)' }}>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: 'var(--dia-green-600)' }}
        >
          <span className="text-white text-xs font-bold tracking-wide" style={{ fontFamily: 'var(--font-display)' }}>D</span>
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-sm font-semibold tracking-tight" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-display)' }}>
            DIA Park
          </span>
          <span className="text-[10px] mt-0.5" style={{ color: 'var(--neutral-500)' }}>Корпоративный портал</span>
        </div>
      </div>

      {/* Object selector */}
      <div className="px-3 pt-3 pb-2 shrink-0">
        <button
          className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-left transition-colors hover:bg-[var(--neutral-100)]"
          style={{ border: '1px solid var(--neutral-300)' }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <Building2 size={14} strokeWidth={1.5} style={{ color: 'var(--dia-green-600)', flexShrink: 0 }} />
            <span className="text-xs font-medium truncate" style={{ color: 'var(--neutral-800)' }}>
              Dia Park · Башня А
            </span>
          </div>
          <ChevronDown size={12} strokeWidth={1.5} style={{ color: 'var(--neutral-500)', flexShrink: 0 }} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-1">
        <div className="flex flex-col gap-0.5">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = item.href === activePath
            return (
              <Link
                key={item.label}
                href={item.href}
                className="group relative flex items-center gap-3 px-3 py-2 rounded-lg text-left w-full transition-colors"
                style={{
                  background: isActive ? 'var(--dia-green-50)' : 'transparent',
                  color: isActive ? 'var(--dia-green-700)' : 'var(--neutral-600)',
                }}
                onMouseEnter={e => {
                  if (!isActive) (e.currentTarget as HTMLAnchorElement).style.background = 'var(--neutral-100)'
                }}
                onMouseLeave={e => {
                  if (!isActive) (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
                }}
              >
                {/* Active indicator */}
                {isActive && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                    style={{ background: 'var(--dia-green-600)' }}
                  />
                )}
                <Icon
                  size={16}
                  strokeWidth={1.5}
                  style={{ color: isActive ? 'var(--dia-green-600)' : 'var(--neutral-500)', flexShrink: 0 }}
                />
                <span
                  className="text-[13px] flex-1 truncate"
                  style={{
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'var(--dia-green-700)' : 'var(--neutral-700)',
                  }}
                >
                  {item.label}
                </span>
                {/* Badges */}
                {item.badge && item.badgeType === 'count' && (
                  <span
                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full min-w-[18px] text-center"
                    style={{ background: 'var(--status-danger-bg)', color: 'var(--status-danger-main)', fontFamily: 'var(--font-mono)' }}
                  >
                    {item.badge}
                  </span>
                )}
                {item.badge && item.badgeType === 'dot' && (
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: 'var(--status-info-main)' }}
                  />
                )}
                {item.badge && item.badgeType === 'ai' && (
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: 'var(--dia-green-600)', color: 'white', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}
                  >
                    AI
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Profile */}
      <div
        className="shrink-0 px-3 pb-4 pt-3 border-t"
        style={{ borderColor: 'var(--neutral-200)' }}
      >
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-[var(--neutral-100)] transition-colors">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0"
            style={{ background: 'var(--dia-green-600)' }}
          >
            АС
          </div>
          <div className="flex flex-col leading-none min-w-0">
            <span className="text-[13px] font-medium truncate" style={{ color: 'var(--neutral-800)' }}>Айгерим Сулейменова</span>
            <span className="text-[11px] mt-0.5 truncate" style={{ color: 'var(--neutral-500)' }}>Управляющий</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
