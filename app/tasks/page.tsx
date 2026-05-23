import { Sidebar } from '@/components/dashboard/Sidebar'
import { TopBar } from '@/components/dashboard/TopBar'
import { TasksContent } from '@/components/tasks/TasksContent'

export default function TasksPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--neutral-50)' }}>
      <Sidebar activePath="/tasks" />
      <TopBar breadcrumb={[{ label: 'Главная' }, { label: 'Заявки и задачи' }]} />
      
      <main 
        className="ml-[260px] pt-16 min-h-screen"
        style={{ background: 'var(--neutral-50)' }}
      >
        <div className="p-6 h-[calc(100vh-64px)] flex flex-col">
          <TasksContent />
        </div>
      </main>
    </div>
  )
}
