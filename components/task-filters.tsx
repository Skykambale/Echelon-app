"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Filter } from "lucide-react"

interface TaskFiltersProps {
  onFilterChange: (filter: string) => void
}

export function TaskFilters({ onFilterChange }: TaskFiltersProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onFilterChange("all")}>All Tasks</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange("completed")}>Completed Tasks</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange("incomplete")}>Incomplete Tasks</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

