"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

export function StatusSelector() {
  const [status, setStatus] = useState("Status of Day")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          {status}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setStatus("Productive")}>Productive</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setStatus("Efficient")}>Efficient</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setStatus("Average")}>Average</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setStatus("Not Productive")}>Not Productive</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

