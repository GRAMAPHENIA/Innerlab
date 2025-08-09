"use client"

import { useTheme } from "next-themes"
import {
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts"
import { useInnerLab } from "@/context/innerlab-context"

const attributeLabels: Record<string, string> = {
  creativity: "Creatividad",
  logic: "Lógica",
  intuition: "Intuición",
  focus: "Enfoque",
}

export function RadarChart() {
  const { attributes } = useInnerLab()
  const { theme } = useTheme()

  const data = Object.entries(attributes).map(([name, value]) => ({
    attribute: attributeLabels[name] || name,
    value: value,
    fullMark: 100,
  }))

  const tickColor = theme === "dark" ? "#e5e7eb" : "#4b5563"
  const lineColor = theme === "dark" ? "#4b5563" : "#d1d5db"

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke={lineColor} />
          <PolarAngleAxis dataKey="attribute" tick={{ fill: tickColor, fontSize: 14 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Personalidad"
            dataKey="value"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.6}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
              borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
              borderRadius: "0.5rem",
            }}
          />
          <Legend wrapperStyle={{ paddingTop: "20px" }} />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  )
}