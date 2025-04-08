"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { day: "Mon", completed: 4, total: 6 },
  { day: "Tue", completed: 5, total: 7 },
  { day: "Wed", completed: 3, total: 5 },
  { day: "Thu", completed: 6, total: 8 },
  { day: "Fri", completed: 7, total: 9 },
  { day: "Sat", completed: 2, total: 3 },
  { day: "Sun", completed: 1, total: 2 },
]

export function TaskCompletionBarChart() {
  return (
    <ChartContainer
      config={{
        completed: {
          label: "Completed",
          color: "hsl(143, 85%, 60%)",
        },
        total: {
          label: "Total",
          color: "hsl(217, 91%, 60%)",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis dataKey="day" stroke="rgba(255, 255, 255, 0.5)" />
          <YAxis domain={[0, 12]} stroke="rgba(255, 255, 255, 0.5)" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="completed" fill="var(--color-completed)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="total" fill="var(--color-total)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

