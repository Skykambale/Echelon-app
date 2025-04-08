"use client";

import { ChartContainer } from "@/components/ui/chart";
import { Cell, Pie, PieChart, PieLabelRenderProps, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Monday", value: 17, color: "#60a5fa" },
  { name: "Tuesday", value: 17, color: "#4ade80" },
  { name: "Wednesday", value: 11, color: "#a78bfa" },
  { name: "Thursday", value: 17, color: "#fbbf24" },
  { name: "Friday", value: 17, color: "#f87171" },
  { name: "Saturday", value: 11, color: "#38bdf8" },
  { name: "Sunday", value: 11, color: "#fb7185" },
];

interface TaskDistributionPieChartProps {
  onDaySelect: (day: string) => void;
}

export function TaskDistributionPieChart({ onDaySelect }: TaskDistributionPieChartProps) {
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: PieLabelRenderProps & { index: number }) => {
    const RADIAN = Math.PI / 180;

    // Coerce outerRadius to a number and handle undefined
    const outerRadiusNum = typeof outerRadius === 'number' ? outerRadius : 0;
    const radius = outerRadiusNum * 1.2;

    // Coerce cx, cy to numbers in case they're undefined
    const cxNum = typeof cx === 'number' ? cx : 0;
    const cyNum = typeof cy === 'number' ? cy : 0;

    const x = cxNum + radius * Math.cos(-midAngle! * RADIAN);
    const y = cyNum + radius * Math.sin(-midAngle! * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={data[index]?.color ?? "#8884d8"} // Safely access color with fallback
        textAnchor={x > cxNum ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
      >
        {`${data[index]?.name}: ${(percent! * 100).toFixed(0)}%`}
      </text>
    );
  };

  const config = Object.fromEntries(
    data.map((d) => [
      d.name,
      {
        color: d.color,
      },
    ])
  );

  return (
    <ChartContainer className="h-[400px]" config={config}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            onClick={(entry: { name: string }) => onDaySelect(entry.name)}
            cursor="pointer"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [`${value}%`, name]}
            contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
