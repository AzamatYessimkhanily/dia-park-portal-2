"use client"

import { useState, useEffect } from "react"
import { 
  AlertTriangle, Shield, Users, Camera, CameraOff, Clock, 
  Bell, UserCheck, UserX, Plus, ChevronRight, Eye, 
  Phone, FileText, CheckCircle2, Circle, Image as ImageIcon,
  DoorOpen, DoorClosed, Car, Package, Volume2, Flame,
  Zap, AlertCircle, Info, CheckCircle, User
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Incident types with colors
const incidentTypes = {
  emergency: { color: "#D7263D", bg: "rgba(215, 38, 61, 0.15)", icon: AlertTriangle, label: "Экстренное" },
  warning: { color: "#D89614", bg: "rgba(216, 150, 20, 0.15)", icon: AlertCircle, label: "Внимание" },
  normal: { color: "#3FBC7E", bg: "rgba(63, 188, 126, 0.15)", icon: CheckCircle, label: "Норма" },
  info: { color: "#1E6FE0", bg: "rgba(30, 111, 224, 0.15)", icon: Info, label: "Информация" },
}

// Mock incidents data
const incidents = [
  { id: 1, time: "03:42:18", type: "emergency", location: "Паркинг B2", description: "Сработала пожарная сигнализация", icon: Flame },
  { id: 2, time: "03:28:55", type: "warning", location: "Вход главный", description: "Попытка прохода без пропуска", icon: UserX },
  { id: 3, time: "02:57:12", type: "normal", location: "Этаж 8", description: "Проход: Асанов К.М. (ТОО Vertex)", icon: DoorOpen },
  { id: 4, time: "02:41:30", type: "info", location: "Лифт 2", description: "Плановая остановка на ТО", icon: Info },
  { id: 5, time: "02:15:44", type: "normal", location: "Паркинг A1", description: "Выезд: Toyota Camry 789AZB02", icon: Car },
  { id: 6, time: "01:58:22", type: "warning", location: "Этаж 12", description: "Дверь на лестницу открыта >5 мин", icon: DoorClosed },
  { id: 7, time: "01:32:08", type: "normal", location: "Грузовой вход", description: "Доставка: ИП Султанов (4 коробки)", icon: Package },
  { id: 8, time: "01:14:55", type: "info", location: "Периметр", description: "Обход завершён — норма", icon: Shield },
]

// Building floors data
const floors = [
  { floor: 14, name: "Технический", cameras: [true, true], status: "normal", occupancy: 0 },
  { floor: 13, name: "ТОО DataCom", cameras: [true, true, true], status: "normal", occupancy: 2 },
  { floor: 12, name: "ТОО DataCom", cameras: [true, false, true], status: "warning", occupancy: 0 },
  { floor: 11, name: "Vertex Group", cameras: [true, true], status: "normal", occupancy: 1 },
  { floor: 10, name: "Vertex Group", cameras: [true, true, true], status: "normal", occupancy: 3 },
  { floor: 9, name: "KazFinance", cameras: [true, true], status: "normal", occupancy: 0 },
  { floor: 8, name: "KazFinance", cameras: [true, true, true, true], status: "active", occupancy: 4 },
  { floor: 7, name: "Свободно", cameras: [true, true], status: "empty", occupancy: 0 },
  { floor: 6, name: "АО НефтьСервис", cameras: [true, true, true], status: "normal", occupancy: 1 },
  { floor: 5, name: "АО НефтьСервис", cameras: [true, true], status: "normal", occupancy: 0 },
  { floor: 4, name: "TechHub Almaty", cameras: [true, true, true], status: "normal", occupancy: 2 },
  { floor: 3, name: "TechHub Almaty", cameras: [true, true], status: "normal", occupancy: 0 },
  { floor: 2, name: "Ресепшн / Общие", cameras: [true, true, true, true], status: "normal", occupancy: 1 },
  { floor: 1, name: "Лобби / Охрана", cameras: [true, true, true, true, true], status: "active", occupancy: 3 },
]

// Visitors data
const expectedVisitors = [
  { name: "Ермеков Данияр", company: "ИП Ермеков", time: "04:00", host: "TechHub", floor: 4 },
  { name: "Курмангалиев А.", company: "Курьер Kaspi", time: "05:30", host: "Vertex", floor: 10 },
  { name: "Омарова Сауле", company: "Аудит KZ", time: "06:00", host: "KazFinance", floor: 9 },
  { name: "Жунусов Берик", company: "IT Support", time: "07:00", host: "DataCom", floor: 13 },
]

const presentVisitors = [
  { name: "Асанов Кайрат", company: "ТОО Vertex", entryTime: "02:57", floor: 8 },
  { name: "Нурланова Айгуль", company: "DataCom", entryTime: "23:15", floor: 13 },
  { name: "Сериков Марат", company: "Ночная уборка", entryTime: "22:00", floor: "все" },
  { name: "Искаков Тимур", company: "Ночная уборка", entryTime: "22:00", floor: "все" },
  { name: "Касымов Арман", company: "DataCom IT", entryTime: "01:20", floor: 13 },
  { name: "Бекетов Нурлан", company: "КазЭнерго", entryTime: "00:45", floor: 6 },
  { name: "Турсынов Ержан", company: "ТОО НефтьСервис", entryTime: "23:50", floor: 5 },
  { name: "Сагынбаев Д.", company: "Vertex Group", entryTime: "02:10", floor: 10 },
  { name: "Абилов Жандос", company: "TechHub", entryTime: "01:05", floor: 4 },
  { name: "Муратов Алмас", company: "DataCom", entryTime: "00:30", floor: 12 },
  { name: "Есенов Руслан", company: "KazFinance", entryTime: "02:40", floor: 8 },
  { name: "Жумабеков А.", company: "Курьер Glovo", entryTime: "03:15", floor: 1 },
]

const blockedVisitors = [
  { name: "Ибрагимов К.С.", reason: "Просроченный пропуск", since: "18.05.2026" },
  { name: "ТОО СтройМонтаж", reason: "Задолженность", since: "10.05.2026" },
]

// Shift handover checklist
const handoverChecklist = [
  { id: 1, label: "Обход периметра выполнен", checked: true },
  { id: 2, label: "Все камеры проверены", checked: true },
  { id: 3, label: "Журнал инцидентов заполнен", checked: true },
  { id: 4, label: "Ключи пересчитаны", checked: false },
  { id: 5, label: "Техническое помещение закрыто", checked: false },
  { id: 6, label: "Фотофиксация выполнена", checked: false },
]

export function SecurityContent() {
  const [shiftTimer, setShiftTimer] = useState("07:12:47")
  const [hoveredFloor, setHoveredFloor] = useState<number | null>(null)
  const [handoverNotes, setHandoverNotes] = useState("")
  const [checklist, setChecklist] = useState(handoverChecklist)

  // Simulate timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setShiftTimer(prev => {
        const [h, m, s] = prev.split(":").map(Number)
        let newS = s - 1
        let newM = m
        let newH = h
        if (newS < 0) { newS = 59; newM -= 1 }
        if (newM < 0) { newM = 59; newH -= 1 }
        if (newH < 0) return "00:00:00"
        return `${String(newH).padStart(2, "0")}:${String(newM).padStart(2, "0")}:${String(newS).padStart(2, "0")}`
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const toggleChecklistItem = (id: number) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ))
  }

  const getFloorStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-[#3FBC7E]/20 border-[#3FBC7E]/40"
      case "warning": return "bg-[#D89614]/20 border-[#D89614]/40"
      case "empty": return "bg-[#2A332E]/50 border-[#2A332E]"
      default: return "bg-[#171D1A] border-[#2A332E]"
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#0B0F0D] text-white/[0.92]">
      {/* Security-specific Header */}
      <header className="sticky top-16 z-10 bg-[#11161A] border-b border-[#2A332E] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#3FBC7E]/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#3FBC7E]" strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="font-display text-lg font-semibold tracking-tight">
                  Охрана · Смена 22.05.2026 · 20:00 — 08:00
                </h1>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <span>Дежурный:</span>
                  <Avatar className="w-5 h-5">
                    <AvatarFallback className="bg-[#3FBC7E]/20 text-[#3FBC7E] text-[10px]">КА</AvatarFallback>
                  </Avatar>
                  <span className="text-white/80">Канат Абдрахманов</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Shift timer */}
            <div className="flex items-center gap-2 px-4 py-2 bg-[#0B0F0D] rounded-lg border border-[#2A332E]">
              <Clock className="w-4 h-4 text-white/40" strokeWidth={1.5} />
              <span className="text-sm text-white/60">До конца смены:</span>
              <span className="font-mono text-lg text-[#3FBC7E] font-medium tracking-wider">{shiftTimer}</span>
            </div>

            {/* Emergency button */}
            <Button 
              className="bg-[#D7263D] hover:bg-[#B3001E] text-white font-semibold px-6 py-5 text-base gap-2 animate-pulse hover:animate-none"
            >
              <AlertTriangle className="w-5 h-5" strokeWidth={2} />
              Экстренное уведомление
            </Button>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="p-6">
        <div className="grid grid-cols-[340px_1fr_320px] gap-6">
          
          {/* Column 1: Incident Log */}
          <div className="bg-[#11161A] rounded-xl border border-[#2A332E] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#2A332E] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#3FBC7E]" strokeWidth={1.5} />
                <h2 className="font-display font-semibold">Журнал инцидентов</h2>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3FBC7E] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3FBC7E]"></span>
                </span>
                <span className="text-xs text-white/50">Live</span>
              </div>
            </div>

            <div className="divide-y divide-[#2A332E] max-h-[calc(100vh-340px)] overflow-y-auto">
              {incidents.map((incident, idx) => {
                const typeConfig = incidentTypes[incident.type as keyof typeof incidentTypes]
                const IconComponent = incident.icon
                return (
                  <div 
                    key={incident.id}
                    className="relative pl-4 pr-3 py-3 hover:bg-[#171D1A] transition-colors group"
                  >
                    {/* Left border indicator */}
                    <div 
                      className="absolute left-0 top-0 bottom-0 w-[3px]"
                      style={{ backgroundColor: typeConfig.color }}
                    />
                    
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: typeConfig.bg }}
                      >
                        <IconComponent className="w-4 h-4" style={{ color: typeConfig.color }} strokeWidth={1.5} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs text-white/50">{incident.time}</span>
                          {idx === 0 && (
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: typeConfig.color }}></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: typeConfig.color }}></span>
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-medium text-white/90 mb-0.5">{incident.description}</p>
                        <p className="text-xs text-white/50">{incident.location}</p>
                      </div>

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-white/40 hover:text-white hover:bg-[#2A332E]">
                          <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-white/40 hover:text-white hover:bg-[#2A332E]">
                          <FileText className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Column 2: Building Plan */}
          <div className="bg-[#11161A] rounded-xl border border-[#2A332E] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#2A332E] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#3FBC7E]" strokeWidth={1.5} />
                <h2 className="font-display font-semibold">План объекта · DIA Park Tower A</h2>
              </div>
              <div className="flex items-center gap-4 text-xs text-white/50">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#3FBC7E]"></span>
                  <span>Камера ОК</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#D7263D]"></span>
                  <span>Офлайн</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#D89614]"></span>
                  <span>Внимание</span>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-1.5 max-h-[calc(100vh-340px)] overflow-y-auto">
              {floors.map((floor) => (
                <div
                  key={floor.floor}
                  className={cn(
                    "relative px-4 py-2.5 rounded-lg border transition-all cursor-pointer",
                    getFloorStatusColor(floor.status),
                    hoveredFloor === floor.floor && "ring-1 ring-[#3FBC7E]/50"
                  )}
                  onMouseEnter={() => setHoveredFloor(floor.floor)}
                  onMouseLeave={() => setHoveredFloor(null)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-semibold text-white/80 w-6">
                        {String(floor.floor).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-white/70">{floor.name}</span>
                      {floor.status === "active" && (
                        <Badge className="bg-[#3FBC7E]/20 text-[#3FBC7E] border-0 text-[10px] px-1.5 py-0">
                          Активность
                        </Badge>
                      )}
                      {floor.status === "warning" && (
                        <Badge className="bg-[#D89614]/20 text-[#D89614] border-0 text-[10px] px-1.5 py-0">
                          Внимание
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Occupancy */}
                      {floor.occupancy > 0 && (
                        <div className="flex items-center gap-1 text-xs text-white/50">
                          <User className="w-3 h-3" strokeWidth={1.5} />
                          <span>{floor.occupancy}</span>
                        </div>
                      )}

                      {/* Cameras */}
                      <div className="flex items-center gap-1">
                        {floor.cameras.map((isActive, idx) => (
                          <span
                            key={idx}
                            className={cn(
                              "w-2 h-2 rounded-full",
                              isActive ? "bg-[#3FBC7E]" : "bg-[#D7263D]"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hover tooltip */}
                  {hoveredFloor === floor.floor && (
                    <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-10 bg-[#171D1A] border border-[#2A332E] rounded-lg p-3 shadow-xl min-w-[200px]">
                      <div className="text-sm font-medium text-white mb-2">Этаж {floor.floor}: {floor.name}</div>
                      <div className="space-y-1 text-xs text-white/60">
                        <div className="flex justify-between">
                          <span>Камеры:</span>
                          <span className="text-white/80">{floor.cameras.filter(Boolean).length}/{floor.cameras.length} активны</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Присутствует:</span>
                          <span className="text-white/80">{floor.occupancy} чел.</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Статус:</span>
                          <span className={cn(
                            floor.status === "warning" && "text-[#D89614]",
                            floor.status === "active" && "text-[#3FBC7E]",
                            floor.status === "normal" && "text-white/80"
                          )}>
                            {floor.status === "warning" ? "Внимание" : floor.status === "active" ? "Активность" : "Норма"}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="w-full mt-2 h-7 text-xs text-[#3FBC7E] hover:bg-[#3FBC7E]/10">
                        Открыть камеры
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Visitors */}
          <div className="bg-[#11161A] rounded-xl border border-[#2A332E] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#2A332E] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#3FBC7E]" strokeWidth={1.5} />
                <h2 className="font-display font-semibold">Посетители</h2>
              </div>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-[#3FBC7E] hover:bg-[#3FBC7E]/10 gap-1">
                <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
                Визит
              </Button>
            </div>

            <div className="max-h-[calc(100vh-340px)] overflow-y-auto">
              {/* Expected */}
              <div className="px-4 py-2 bg-[#0B0F0D] border-b border-[#2A332E]">
                <span className="text-xs font-medium text-white/50 uppercase tracking-wider">Ожидаются · {expectedVisitors.length}</span>
              </div>
              <div className="divide-y divide-[#2A332E]/50">
                {expectedVisitors.map((visitor, idx) => (
                  <div key={idx} className="px-4 py-2.5 hover:bg-[#171D1A] transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white/80">{visitor.name}</span>
                      <span className="font-mono text-xs text-white/40">{visitor.time}</span>
                    </div>
                    <div className="text-xs text-white/50">
                      {visitor.company} → {visitor.host}, эт. {visitor.floor}
                    </div>
                  </div>
                ))}
              </div>

              {/* Present */}
              <div className="px-4 py-2 bg-[#0B0F0D] border-y border-[#2A332E]">
                <span className="text-xs font-medium text-white/50 uppercase tracking-wider">В здании · {presentVisitors.length}</span>
              </div>
              <div className="divide-y divide-[#2A332E]/50">
                {presentVisitors.slice(0, 8).map((visitor, idx) => (
                  <div key={idx} className="px-4 py-2 hover:bg-[#171D1A] transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3FBC7E]"></span>
                        <span className="text-sm text-white/80">{visitor.name}</span>
                      </div>
                      <span className="font-mono text-xs text-white/40">{visitor.entryTime}</span>
                    </div>
                    <div className="text-xs text-white/50 ml-3.5">{visitor.company} · эт. {visitor.floor}</div>
                  </div>
                ))}
                {presentVisitors.length > 8 && (
                  <div className="px-4 py-2 text-center">
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-white/50 hover:text-white">
                      Ещё {presentVisitors.length - 8} посетителей
                    </Button>
                  </div>
                )}
              </div>

              {/* Blocked */}
              <div className="px-4 py-2 bg-[#D7263D]/10 border-y border-[#D7263D]/30">
                <span className="text-xs font-medium text-[#D7263D] uppercase tracking-wider">Заблокированы · {blockedVisitors.length}</span>
              </div>
              <div className="divide-y divide-[#2A332E]/50">
                {blockedVisitors.map((visitor, idx) => (
                  <div key={idx} className="px-4 py-2.5 hover:bg-[#171D1A] transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <UserX className="w-3.5 h-3.5 text-[#D7263D]" strokeWidth={1.5} />
                        <span className="text-sm font-medium text-white/80">{visitor.name}</span>
                      </div>
                      <Badge className="bg-[#D7263D]/20 text-[#D7263D] border-0 text-[10px]">
                        Блок
                      </Badge>
                    </div>
                    <div className="text-xs text-white/50 ml-5.5">
                      {visitor.reason} · с {visitor.since}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Shift Handover Section */}
        <div className="mt-6 bg-[#11161A] rounded-xl border border-[#2A332E] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#2A332E] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#3FBC7E]" strokeWidth={1.5} />
              <h2 className="font-display font-semibold">Передача смены</h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/50">
              <span>Следующий дежурный:</span>
              <Avatar className="w-5 h-5">
                <AvatarFallback className="bg-[#1E6FE0]/20 text-[#1E6FE0] text-[10px]">БА</AvatarFallback>
              </Avatar>
              <span className="text-white/70">Бауыржан Алиев</span>
            </div>
          </div>

          <div className="p-4 grid grid-cols-[1fr_300px_200px] gap-6">
            {/* Notes */}
            <div>
              <label className="text-xs font-medium text-white/50 uppercase tracking-wider mb-2 block">
                Примечания к смене
              </label>
              <Textarea
                value={handoverNotes}
                onChange={(e) => setHandoverNotes(e.target.value)}
                placeholder="Опишите важные события и замечания для следующей смены..."
                className="bg-[#0B0F0D] border-[#2A332E] text-white/90 placeholder:text-white/30 min-h-[100px] resize-none focus:border-[#3FBC7E]/50 focus:ring-[#3FBC7E]/20"
              />
            </div>

            {/* Checklist */}
            <div>
              <label className="text-xs font-medium text-white/50 uppercase tracking-wider mb-2 block">
                Чек-лист ({checklist.filter(i => i.checked).length}/{checklist.length})
              </label>
              <div className="space-y-2">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors",
                      item.checked 
                        ? "bg-[#3FBC7E]/10 border-[#3FBC7E]/30" 
                        : "bg-[#0B0F0D] border-[#2A332E] hover:border-[#3FBC7E]/30"
                    )}
                    onClick={() => toggleChecklistItem(item.id)}
                  >
                    <Checkbox 
                      checked={item.checked}
                      className="border-[#2A332E] data-[state=checked]:bg-[#3FBC7E] data-[state=checked]:border-[#3FBC7E]"
                    />
                    <span className={cn(
                      "text-sm",
                      item.checked ? "text-white/70" : "text-white/90"
                    )}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo upload */}
            <div>
              <label className="text-xs font-medium text-white/50 uppercase tracking-wider mb-2 block">
                Фотофиксация
              </label>
              <div className="border-2 border-dashed border-[#2A332E] rounded-lg p-4 text-center hover:border-[#3FBC7E]/40 transition-colors cursor-pointer">
                <ImageIcon className="w-8 h-8 text-white/30 mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-xs text-white/50">Добавить фото</p>
                <p className="text-[10px] text-white/30 mt-1">JPG, PNG до 5MB</p>
              </div>
              <Button className="w-full mt-3 bg-[#3FBC7E] hover:bg-[#15824F] text-white font-medium">
                Завершить смену
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
