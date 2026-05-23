'use client'

import { useState } from 'react'
import { 
  User,
  Shield,
  Bell,
  Building2,
  Users,
  Settings,
  Key,
  Mail,
  Smartphone,
  Globe,
  ChevronRight,
  Check,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

const roles = [
  { id: 1, name: 'Руководство', users: 2, permissions: ['all'], color: 'var(--dia-green-600)' },
  { id: 2, name: 'Администратор объекта', users: 3, permissions: ['tasks', 'shifts', 'communication', 'residents'], color: 'var(--status-info-main)' },
  { id: 3, name: 'Техническая служба', users: 4, permissions: ['tasks', 'maintenance', 'shifts'], color: 'var(--status-warning-main)' },
  { id: 4, name: 'Клининг', users: 5, permissions: ['tasks', 'cleaning', 'shifts'], color: 'var(--dia-green-600)' },
  { id: 5, name: 'Охрана', users: 6, permissions: ['security', 'shifts'], color: 'var(--neutral-600)' },
  { id: 6, name: 'Финансовый отдел', users: 2, permissions: ['finance', 'residents', 'documents'], color: 'var(--priority-high)' },
]

const notificationSettings = [
  { id: 'new_task', label: 'Новая заявка', email: true, push: true, telegram: false },
  { id: 'task_assigned', label: 'Назначена задача', email: true, push: true, telegram: true },
  { id: 'task_overdue', label: 'Задача просрочена', email: true, push: true, telegram: true },
  { id: 'emergency', label: 'Аварийная ситуация', email: true, push: true, telegram: true },
  { id: 'incident', label: 'Новый инцидент', email: false, push: true, telegram: false },
  { id: 'payment', label: 'Платёж получен', email: true, push: false, telegram: false },
  { id: 'debt', label: 'Новая задолженность', email: true, push: true, telegram: false },
  { id: 'report', label: 'Еженедельный отчёт', email: true, push: false, telegram: false },
]

export function SettingsContent() {
  const [activeTab, setActiveTab] = useState('profile')
  const [notifications, setNotifications] = useState(notificationSettings)

  const toggleNotification = (id: string, channel: 'email' | 'push' | 'telegram') => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, [channel]: !n[channel] } : n
    ))
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-display)' }}>
          Настройки
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--neutral-500)' }}>
          Управление профилем, ролями и уведомлениями
        </p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Navigation */}
        <div className="w-64 shrink-0">
          <nav className="space-y-1">
            {[
              { id: 'profile', label: 'Профиль', icon: User },
              { id: 'roles', label: 'Роли и доступы', icon: Shield },
              { id: 'notifications', label: 'Уведомления', icon: Bell },
              { id: 'object', label: 'Настройки объекта', icon: Building2 },
              { id: 'users', label: 'Пользователи', icon: Users },
              { id: 'system', label: 'Система', icon: Settings },
            ].map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors"
                  style={{
                    background: activeTab === item.id ? 'var(--dia-green-50)' : 'transparent',
                    color: activeTab === item.id ? 'var(--dia-green-700)' : 'var(--neutral-600)',
                  }}
                >
                  <Icon size={18} strokeWidth={1.5} style={{ color: activeTab === item.id ? 'var(--dia-green-600)' : 'var(--neutral-500)' }} />
                  <span className="text-sm" style={{ fontWeight: activeTab === item.id ? 500 : 400 }}>{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="rounded-xl border p-6" style={{ background: 'var(--neutral-0)', borderColor: 'var(--neutral-200)' }}>
              <h2 className="text-lg font-semibold mb-6" style={{ color: 'var(--neutral-900)' }}>Профиль</h2>
              
              <div className="flex items-center gap-4 mb-8">
                <Avatar className="w-20 h-20">
                  <AvatarFallback style={{ background: 'var(--dia-green-100)', color: 'var(--dia-green-700)', fontSize: 24, fontWeight: 600 }}>
                    АС
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-lg font-medium" style={{ color: 'var(--neutral-900)' }}>Айгерим Сулейменова</div>
                  <div className="text-sm" style={{ color: 'var(--neutral-500)' }}>Управляющий · Руководство</div>
                  <Button variant="outline" size="sm" className="mt-2" style={{ borderColor: 'var(--neutral-300)' }}>
                    Изменить фото
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label style={{ color: 'var(--neutral-700)' }}>Имя</Label>
                  <Input defaultValue="Айгерим" style={{ borderColor: 'var(--neutral-300)' }} />
                </div>
                <div className="space-y-2">
                  <Label style={{ color: 'var(--neutral-700)' }}>Фамилия</Label>
                  <Input defaultValue="Сулейменова" style={{ borderColor: 'var(--neutral-300)' }} />
                </div>
                <div className="space-y-2">
                  <Label style={{ color: 'var(--neutral-700)' }}>Email</Label>
                  <Input defaultValue="a.suleimenova@diapark.kz" style={{ borderColor: 'var(--neutral-300)' }} />
                </div>
                <div className="space-y-2">
                  <Label style={{ color: 'var(--neutral-700)' }}>Телефон</Label>
                  <Input defaultValue="+7 700 123 4567" style={{ borderColor: 'var(--neutral-300)' }} />
                </div>
              </div>

              <div className="flex justify-end mt-6 pt-6 border-t" style={{ borderColor: 'var(--neutral-200)' }}>
                <Button style={{ background: 'var(--dia-green-600)' }} className="text-white">
                  Сохранить изменения
                </Button>
              </div>
            </div>
          )}

          {/* Roles Tab */}
          {activeTab === 'roles' && (
            <div className="rounded-xl border p-6" style={{ background: 'var(--neutral-0)', borderColor: 'var(--neutral-200)' }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold" style={{ color: 'var(--neutral-900)' }}>Роли и доступы</h2>
                <Button style={{ background: 'var(--dia-green-600)' }} className="text-white gap-2" size="sm">
                  + Создать роль
                </Button>
              </div>

              <div className="space-y-3">
                {roles.map((role) => (
                  <div 
                    key={role.id}
                    className="flex items-center justify-between p-4 rounded-lg border cursor-pointer hover:bg-[var(--neutral-50)] transition-colors"
                    style={{ borderColor: 'var(--neutral-200)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ background: role.color }}
                      />
                      <div>
                        <div className="font-medium" style={{ color: 'var(--neutral-900)' }}>{role.name}</div>
                        <div className="text-xs mt-0.5" style={{ color: 'var(--neutral-500)' }}>
                          {role.users} пользователей · {role.permissions.includes('all') ? 'Полный доступ' : `${role.permissions.length} разделов`}
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={16} strokeWidth={1.5} style={{ color: 'var(--neutral-400)' }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="rounded-xl border p-6" style={{ background: 'var(--neutral-0)', borderColor: 'var(--neutral-200)' }}>
              <h2 className="text-lg font-semibold mb-6" style={{ color: 'var(--neutral-900)' }}>Настройки уведомлений</h2>

              <div className="space-y-1">
                {/* Header */}
                <div className="flex items-center gap-4 px-4 py-2 text-xs font-medium" style={{ color: 'var(--neutral-500)' }}>
                  <div className="flex-1">Событие</div>
                  <div className="w-16 text-center">Email</div>
                  <div className="w-16 text-center">Push</div>
                  <div className="w-16 text-center">Telegram</div>
                </div>

                {notifications.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-[var(--neutral-50)] transition-colors"
                  >
                    <div className="flex-1 text-sm" style={{ color: 'var(--neutral-700)' }}>{item.label}</div>
                    <div className="w-16 flex justify-center">
                      <Switch 
                        checked={item.email}
                        onCheckedChange={() => toggleNotification(item.id, 'email')}
                      />
                    </div>
                    <div className="w-16 flex justify-center">
                      <Switch 
                        checked={item.push}
                        onCheckedChange={() => toggleNotification(item.id, 'push')}
                      />
                    </div>
                    <div className="w-16 flex justify-center">
                      <Switch 
                        checked={item.telegram}
                        onCheckedChange={() => toggleNotification(item.id, 'telegram')}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-6 pt-6 border-t" style={{ borderColor: 'var(--neutral-200)' }}>
                <Button style={{ background: 'var(--dia-green-600)' }} className="text-white">
                  Сохранить настройки
                </Button>
              </div>
            </div>
          )}

          {/* Other tabs placeholder */}
          {(activeTab === 'object' || activeTab === 'users' || activeTab === 'system') && (
            <div className="rounded-xl border p-8 text-center" style={{ background: 'var(--neutral-0)', borderColor: 'var(--neutral-200)' }}>
              <Settings size={48} strokeWidth={1} style={{ color: 'var(--neutral-300)' }} className="mx-auto mb-4" />
              <h3 className="font-medium mb-2" style={{ color: 'var(--neutral-700)' }}>
                {activeTab === 'object' && 'Настройки объекта'}
                {activeTab === 'users' && 'Управление пользователями'}
                {activeTab === 'system' && 'Системные настройки'}
              </h3>
              <p className="text-sm" style={{ color: 'var(--neutral-500)' }}>
                Этот раздел находится в разработке
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
