"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { day: "Sun", value: 1 },
  { day: "Mon", value: 3 },
  { day: "Tue", value: 2 },
  { day: "Wed", value: 2 },
  { day: "Thu", value: 2 },
  { day: "Fri", value: 3 },
]

export function ProductivityLineChart() {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Productivity Level",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis dataKey="day" stroke="rgba(255, 255, 255, 0.5)" />
          <YAxis domain={[0, 3.5]} stroke="rgba(255, 255, 255, 0.5)" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--color-value)"
            strokeWidth={2}
            dot={{ r: 4, fill: "var(--color-value)" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

