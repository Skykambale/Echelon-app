"use client"

import { useState } from "react"
import type { Task } from "@/types/task"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Calendar, Flag } from "lucide-react"
import { cn } from "@/lib/utils"

interface TaskItemProps {
  task: Task
  onStatusChange: (taskId: string, newStatus: string) => void
}

export function TaskItem({ task, onStatusChange }: TaskItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const statusColors = {
    done: "bg-emerald-500 hover:bg-emerald-600",
    "in-progress": "bg-amber-500 hover:bg-amber-600",
    pending: "bg-gray-500 hover:bg-gray-600",
  }

  const priorityColors = {
    low: "text-blue-400",
    medium: "text-yellow-400",
    high: "text-red-400",
  }

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(task.dueDate)

  const toggleStatus = () => {
    const statusOrder = ["pending", "in-progress", "done"]
    const currentIndex = statusOrder.indexOf(task.status)
    const nextIndex = (currentIndex + 1) % statusOrder.length
    onStatusChange(task.id, statusOrder[nextIndex])
  }

  return (
    <div className="py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="p-0 h-auto" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </Button>

          <h3 className="font-medium">Task {task.id}</h3>
        </div>

        <Button
          className={cn("text-white", statusColors[task.status as keyof typeof statusColors])}
          size="sm"
          onClick={toggleStatus}
        >
          {task.status === "done" ? "Done" : task.status === "in-progress" ? "In progress" : "Pending"}
        </Button>
      </div>

      {isExpanded && (
        <div className="mt-4 pl-8">
          <p className="text-gray-300 mb-4">{task.description}</p>

          <div className="flex items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Due: {formattedDate}</span>
            </div>

            <div className="flex items-center gap-1">
              <Flag className={cn("h-4 w-4", priorityColors[task.priority as keyof typeof priorityColors])} />
              <span>Priority: {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

