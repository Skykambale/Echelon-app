"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProductivityLineChart } from "@/components/charts/productivity-line-chart"
import { TaskCompletionBarChart } from "@/components/charts/task-completion-bar-chart"
import { TaskDistributionPieChart } from "@/components/charts/task-distribution-pie-chart"
import { TaskList } from "@/components/task-list-mini"
import { BarChart2, PieChart } from "lucide-react"

export default function VisualizePage() {
  const [viewMode, setViewMode] = useState<"line" | "pie">("line")
  const [selectedDay, setSelectedDay] = useState<string | null>(null)

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Productivity Analytics</h1>

        <div className="flex gap-2">
          <Button
            variant={viewMode === "line" ? "default" : "outline"}
            onClick={() => setViewMode("line")}
            className="gap-2"
          >
            <BarChart2 className="h-4 w-4" />
            Line/Bar View
          </Button>
          <Button
            variant={viewMode === "pie" ? "default" : "outline"}
            onClick={() => setViewMode("pie")}
            className="gap-2"
          >
            <PieChart className="h-4 w-4" />
            Pie Chart View
          </Button>
        </div>
      </div>

      {viewMode === "line" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-950 border-gray-800">
            <CardHeader>
              <CardTitle>Productivity by Days</CardTitle>
              <CardDescription>Weekly productivity levels</CardDescription>
            </CardHeader>
            <CardContent>
              <ProductivityLineChart />
            </CardContent>
          </Card>

          <Card className="bg-gray-950 border-gray-800">
            <CardHeader>
              <CardTitle>Weekly Task Completion</CardTitle>
              <CardDescription>Completed vs total tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <TaskCompletionBarChart />
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-950 border-gray-800">
            <CardHeader>
              <CardTitle>Daily Task Distribution</CardTitle>
              <CardDescription>Click on a day to view tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <TaskDistributionPieChart onDaySelect={setSelectedDay} />
            </CardContent>
          </Card>

          <Card className="bg-gray-950 border-gray-800">
            <CardHeader>
              <CardTitle>Tasks for {selectedDay || "Monday"}</CardTitle>
              <CardDescription>{selectedDay ? `3 tasks, 2 completed` : "Select a day to view tasks"}</CardDescription>
            </CardHeader>
            <CardContent>
              <TaskList day={selectedDay || "Monday"} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

