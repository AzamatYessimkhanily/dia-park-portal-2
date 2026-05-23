'use client'

import { useState } from 'react'
import { 
  Calendar,
  Clock,
  User,
  CheckCircle2,
  AlertCircle,
  FileText,
  ChevronRight,
  Plus,
  ArrowRightLeft,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const shifts = [
  {
    id: 1,
    date: '22.05.2026',
    department: 'Охрана',
    employee: 'Канат Абдрахманов',
    initials: 'КА',
    time: '20:00 — 08:00',
    status: 'active',
    tasks: 12,
    completed: 9,
    incidents: 2,
    notes: 'Сломан турникет на въезде паркинга',
  },
  {
    id: 2,
    date: '22.05.2026',
    department: 'Клининг',
    employee: 'Динара Омарова',
    initials: 'ДО',
    time: '08:00 — 20:00',
    status: 'completed',
    tasks: 18,
    completed: 18,
    incidents: 0,
    notes: 'Все выполнено по графику',
  },
  {
    id: 3,
    date: '22.05.2026',
    department: 'Техника',
    employee: 'Тимур Бекмамбетов',
    initials: 'ТБ',
    time: '08:00 — 17:00',
    status: 'completed',
    tasks: 7,
    completed: 6,
    incidents: 1,
    notes: 'Ожидание запчастей для кондиционера',
  },
  {
    id: 4,
    date: '21.05.2026',
    department: 'Охрана',
    employee: 'Бауыржан Алиев',
    initials: 'БА',
    time: '08:00 — 20:00',
    status: 'completed',
    tasks: 14,
    completed: 14,
    incidents: 1,
    notes: 'Проверка пропусков выполнена',
  },
  {
    id: 5,
    date: '21.05.2026',
    department: 'Админ',
    employee: 'Айгерим Сулейменова',
    initials: 'АС',
    time: '09:00 — 18:00',
    status: 'completed',
    tasks: 23,
    completed: 21,
    incidents: 0,
    notes: 'Встреча с арендаторами 12 этажа',
  },
]

const events = [
  { time: '09:15', type: 'info', text: 'Начало смены: Тимур Бекмамбетов (Техника)' },
  { time: '09:32', type: 'task', text: 'Заявка DP-1487 принята в работу' },
  { time: '10:14', type: 'warning', text: 'Авария: Прорыв трубы 8 этаж' },
  { time: '10:28', type: 'info', text: 'Ремонтная бригада на месте' },
  { time: '11:45', type: 'success', text: 'Авария устранена, уборка завершена' },
  { time: '12:30', type: 'task', text: 'Плановая проверка лифтов началась' },
  { time: '14:00', type: 'info', text: 'Передача смены: охрана (дневная → вечерняя)' },
  { time: '15:22', type: 'task', text: 'Заявка DP-1492 выполнена' },
  { time: '16:45', type: 'warning', text: 'Жалоба от резидента: шум на 7 этаже' },
  { time: '17:10', type: 'success', text: 'Вопрос решен, резидент уведомлен' },
]

const eventTypeStyles: Record<string, { color: string; bg: string }> = {
  info: { color: 'var(--status-info-main)', bg: 'var(--status-info-bg)' },
  task: { color: 'var(--dia-green-600)', bg: 'var(--dia-green-50)' },
  warning: { color: 'var(--status-warning-main)', bg: 'var(--status-warning-bg)' },
  success: { color: 'var(--status-success-main)', bg: 'var(--status-success-bg)' },
}

const departmentColors: Record<string, string> = {
  'Охрана': 'var(--status-info-main)',
  'Клининг': 'var(--dia-green-600)',
  'Техника': 'var(--status-warning-main)',
  'Админ': 'var(--neutral-600)',
}

export function ShiftsContent() {
  const [activeTab, setActiveTab] = useState('journal')

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-display)' }}>
            Смены и операционный журнал
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--neutral-500)' }}>
            Сегодня, 22 мая 2026 · {shifts.filter(s => s.date === '22.05.2026').length} смен
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2" style={{ borderColor: 'var(--neutral-300)' }}>
            <ArrowRightLeft size={16} strokeWidth={1.5} />
            Передать смену
          </Button>
          <Button style={{ background: 'var(--dia-green-600)' }} className="text-white gap-2">
            <Plus size={16} strokeWidth={1.5} />
            Начать смену
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList style={{ background: 'var(--neutral-100)' }}>
          <TabsTrigger value="journal" className="data-[state=active]:bg-white">Журнал событий</TabsTrigger>
          <TabsTrigger value="shifts" className="data-[state=active]:bg-white">История смен</TabsTrigger>
          <TabsTrigger value="calendar" className="data-[state=active]:bg-white">Календарь</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-3 gap-6">
        {/* Events Timeline */}
        <div className="col-span-2">
          <div className="rounded-xl border p-5" style={{ background: 'var(--neutral-0)', borderColor: 'var(--neutral-200)' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold" style={{ color: 'var(--neutral-900)' }}>События за сегодня</h2>
              <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'var(--dia-green-50)', color: 'var(--dia-green-600)' }}>
                Live
              </span>
            </div>
            <div className="space-y-3">
              {events.map((event, idx) => {
                const style = eventTypeStyles[event.type]
                return (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-xs font-medium shrink-0 w-12 pt-0.5" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>
                      {event.time}
                    </span>
                    <div 
                      className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                      style={{ background: style.color }}
                    />
                    <p className="text-sm flex-1" style={{ color: 'var(--neutral-700)' }}>{event.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Active Shifts */}
        <div>
          <div className="rounded-xl border p-5" style={{ background: 'var(--neutral-0)', borderColor: 'var(--neutral-200)' }}>
            <h2 className="font-semibold mb-4" style={{ color: 'var(--neutral-900)' }}>Активные смены</h2>
            <div className="space-y-3">
              {shifts.filter(s => s.status === 'active').map((shift) => (
                <div key={shift.id} className="p-3 rounded-lg border" style={{ borderColor: 'var(--neutral-200)' }}>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-9 h-9">
                      <AvatarFallback style={{ background: 'var(--dia-green-100)', color: 'var(--dia-green-700)', fontSize: 11, fontWeight: 600 }}>
                        {shift.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate" style={{ color: 'var(--neutral-900)' }}>{shift.employee}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span 
                          className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                          style={{ background: departmentColors[shift.department] + '20', color: departmentColors[shift.department] }}
                        >
                          {shift.department}
                        </span>
                        <span className="text-[11px]" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>
                          {shift.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs" style={{ color: 'var(--neutral-500)' }}>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 size={12} strokeWidth={1.5} style={{ color: 'var(--status-success-main)' }} />
                      {shift.completed}/{shift.tasks}
                    </span>
                    {shift.incidents > 0 && (
                      <span className="flex items-center gap-1" style={{ color: 'var(--status-warning-main)' }}>
                        <AlertCircle size={12} strokeWidth={1.5} />
                        {shift.incidents} инц.
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Completed */}
          <div className="rounded-xl border p-5 mt-4" style={{ background: 'var(--neutral-0)', borderColor: 'var(--neutral-200)' }}>
            <h2 className="font-semibold mb-4" style={{ color: 'var(--neutral-900)' }}>Завершённые сегодня</h2>
            <div className="space-y-2">
              {shifts.filter(s => s.status === 'completed' && s.date === '22.05.2026').map((shift) => (
                <div key={shift.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-7 h-7">
                      <AvatarFallback style={{ background: 'var(--neutral-100)', color: 'var(--neutral-600)', fontSize: 10 }}>
                        {shift.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm" style={{ color: 'var(--neutral-700)' }}>{shift.employee}</div>
                      <div className="text-[11px]" style={{ color: 'var(--neutral-500)' }}>{shift.department} · {shift.time}</div>
                    </div>
                  </div>
                  <ChevronRight size={14} strokeWidth={1.5} style={{ color: 'var(--neutral-400)' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
