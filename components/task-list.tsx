"use client"

import { useState, useEffect } from "react"
import type { Task } from "@/types/task"
import { TaskItem } from "./task-item"
import { useToast } from "@/hooks/use-toast"

interface TaskListProps {
  date: Date
  statusFilter: string
}

export function TaskList({ date, statusFilter }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // In a real app, this would fetch from your API
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      const mockTasks: Task[] = [
        {
          id: "1",
          title: "Task 1",
          description: "This is a detailed description for Task 1. You can add more information about this task here.",
          status: "in-progress",
          priority: "medium",
          dueDate: new Date(date),
          createdAt: new Date(),
        },
        {
          id: "2",
          title: "Task 2",
          description: "This is a detailed description for Task 2. You can add more information about this task here.",
          status: "done",
          priority: "medium",
          dueDate: new Date(date),
          createdAt: new Date(),
        },
        {
          id: "3",
          title: "Task 3",
          description: "This is a detailed description for Task 3. You can add more information about this task here.",
          status: "in-progress",
          priority: "high",
          dueDate: new Date(date),
          createdAt: new Date(),
        },
      ]

      setTasks(mockTasks)
      setLoading(false)
    }, 500)
  }, [date])

  const filteredTasks = tasks.filter((task) => {
    if (statusFilter === "all") return true
    if (statusFilter === "completed") return task.status === "done"
    if (statusFilter === "incomplete") return task.status !== "done"
    return true
  })

  const updateTaskStatus = (taskId: string, newStatus: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))

    toast({
      title: "Task updated",
      description: "Task status has been updated successfully.",
    })
  }

  if (loading) {
    return <div className="p-6 text-center text-gray-400">Loading tasks...</div>
  }

  if (filteredTasks.length === 0) {
    return <div className="p-6 text-center text-gray-400">No tasks found for this day.</div>
  }

  return (
    <div className="divide-y divide-gray-800">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} onStatusChange={updateTaskStatus} />
      ))}
    </div>
  )
}

