"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TaskList } from "@/components/task-list"
import { TaskFilters } from "@/components/task-filters"
import { AddTaskDialog } from "@/components/add-task-dialog"
import { StatusSelector } from "@/components/status-selector"
import { ChevronLeft, ChevronRight, Calendar, Plus } from "lucide-react"

export default function TasksPage() {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [statusFilter, setStatusFilter] = useState("all")

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(currentDate)

  const goToPreviousDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 1)
    setCurrentDate(newDate)
  }

  const goToNextDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 1)
    setCurrentDate(newDate)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={goToPreviousDay}>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-md">
            <Calendar className="h-5 w-5 text-gray-400" />
            <span className="font-medium">{formattedDate}</span>
          </div>

          <Button variant="outline" size="icon" onClick={goToNextDay}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <TaskFilters onFilterChange={(filter) => setStatusFilter(filter)} />
          <StatusSelector />
          <Button onClick={() => setIsAddTaskOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add new Task
          </Button>
        </div>
      </div>

      <Card className="border-gray-800 bg-gray-950">
        <CardContent className="p-0">
          <TaskList date={currentDate} statusFilter={statusFilter} />
        </CardContent>
      </Card>

      <AddTaskDialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen} date={currentDate} />
    </div>
  )
}

