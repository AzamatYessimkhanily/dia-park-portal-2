'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, Sun, Moon, Search } from 'lucide-react'

interface TopBarProps {
  breadcrumb?: string | { label: string; href?: string }[]
}

export function TopBar({ breadcrumb = 'Дашборд' }: TopBarProps) {
  const router = useRouter()
  const [isDark, setIsDark] = useState(false)

  // Check for saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('diapark-theme')
    if (savedTheme === 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(prev => {
      const newValue = !prev
      if (newValue) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('diapark-theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('diapark-theme', 'light')
      }
      return newValue
    })
  }

  // Normalize breadcrumb to array
  const breadcrumbItems = typeof breadcrumb === 'string' 
    ? [{ label: 'Главная', href: '/' }, { label: breadcrumb }]
    : breadcrumb

  return (
    <header
      className="fixed top-0 left-[260px] right-0 h-16 flex items-center justify-between px-6 z-30 border-b"
      style={{
        background: 'var(--neutral-0)',
        borderColor: 'var(--neutral-200)',
      }}
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 shrink-0">
        {breadcrumbItems.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-[13px]" style={{ color: 'var(--neutral-400)' }}>/</span>}
            {item.href ? (
              <button 
                onClick={() => router.push(item.href!)}
                className="text-[13px] hover:underline" 
                style={{ color: 'var(--neutral-500)' }}
              >
                {item.label}
              </button>
            ) : (
              <span 
                className="text-[13px]" 
                style={{ 
                  color: i === breadcrumbItems.length - 1 ? 'var(--neutral-800)' : 'var(--neutral-500)',
                  fontWeight: i === breadcrumbItems.length - 1 ? 500 : 400,
                }}
              >
                {item.label}
              </span>
            )}
          </span>
        ))}
      </div>

      {/* Global Search */}
      <div className="flex-1 max-w-md mx-8">
        <div
          className="flex items-center gap-2.5 px-3.5 h-9 rounded-lg w-full cursor-pointer transition-colors hover:border-[var(--neutral-400)]"
          style={{ border: '1px solid var(--neutral-300)', background: 'var(--neutral-50)' }}
        >
          <Search size={14} strokeWidth={1.5} style={{ color: 'var(--neutral-500)', flexShrink: 0 }} />
          <span className="text-[13px] flex-1" style={{ color: 'var(--neutral-400)' }}>
            Найти заявку, резидента, сотрудника...
          </span>
          <div
            className="flex items-center gap-0.5 shrink-0"
            style={{ background: 'var(--neutral-200)', borderRadius: '4px', padding: '1px 5px' }}
          >
            <span className="text-[10px] font-mono" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>⌘K</span>
          </div>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Date */}
        <span className="text-[12px] hidden lg:block" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>
          Пятница, 22 мая 2026
        </span>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-[var(--neutral-100)]"
          aria-label="Переключить тему"
        >
          {isDark ? (
            <Moon size={16} strokeWidth={1.5} style={{ color: 'var(--neutral-500)' }} />
          ) : (
            <Sun size={16} strokeWidth={1.5} style={{ color: 'var(--neutral-500)' }} />
          )}
        </button>

        {/* Notifications */}
        <button
          onClick={() => router.push('/notifications')}
          className="relative w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-[var(--neutral-100)]"
          aria-label="Уведомления"
        >
          <Bell size={16} strokeWidth={1.5} style={{ color: 'var(--neutral-600)' }} />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2"
            style={{ background: 'var(--status-danger-main)', borderColor: 'var(--neutral-0)' }}
          />
        </button>
      </div>
    </header>
  )
}
