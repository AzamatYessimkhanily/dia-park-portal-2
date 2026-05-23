import { Sidebar } from "@/components/dashboard/Sidebar"
import { TopBar } from "@/components/dashboard/TopBar"
import { TaskDetailContent } from "@/components/tasks/TaskDetailContent"

export const metadata = {
  title: "DP-1487 — Заявка | DIA Park",
  description: "Детали заявки DP-1487",
}

export default function TaskDetailPage() {
  return (
    <div className="flex min-h-screen bg-[var(--neutral-25)]">
      <Sidebar activePath="/tasks" />
      <div className="flex-1 ml-[260px]">
        <TopBar breadcrumb={[
          { label: "Заявки", href: "/tasks" },
          { label: "DP-1487" }
        ]} />
        <main className="pt-16">
          <TaskDetailContent />
        </main>
      </div>
    </div>
  )
}
