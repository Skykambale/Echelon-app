"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, BarChart2, CheckSquare, Sparkles } from "lucide-react"

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Visualize",
    href: "/visualize",
    icon: BarChart2,
  },
  {
    name: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    name: "AI",
    href: "/ai",
    icon: Sparkles,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen flex-col border-r border-gray-800 bg-black w-[320px] p-6">
      <div className="flex-1">
        <Link href="/dashboard" className="flex items-center">
          <h1 className="text-3xl font-bold text-purple-500">Echelon</h1>
        </Link>

        <nav className="mt-12 flex flex-col space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:text-white",
                pathname === item.href && "bg-gray-900 text-white",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto">
        <div className="flex items-center gap-3 rounded-full bg-gray-900 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 text-white">
            <span className="text-lg font-medium">JD</span>
          </div>
          <div>
            <p className="text-sm font-medium text-white">John Doe</p>
            <p className="text-xs text-gray-400">Premium</p>
          </div>
        </div>
      </div>
    </div>
  )
}

