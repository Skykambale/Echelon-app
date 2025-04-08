"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AddTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  date: Date
}

export function AddTaskDialog({ open, onOpenChange, date }: AddTaskDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("to-do")
  const [priority, setPriority] = useState("medium")
  const [dueDate, setDueDate] = useState<Date | undefined>(date)
  const { toast } = useToast()

  const handleSubmit = () => {
    if (!title) {
      toast({
        title: "Error",
        description: "Please enter a task title",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would call your API to create the task
    toast({
      title: "Task created",
      description: "Your task has been created successfully.",
    })

    // Reset form
    setTitle("")
    setDescription("")
    setStatus("to-do")
    setPriority("medium")
    setDueDate(date)

    // Close dialog
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-gray-950 border-gray-800">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>Create a new task to track your progress.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="bg-gray-900 border-gray-800"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              className="bg-gray-900 border-gray-800 min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="bg-gray-900 border-gray-800">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="to-do">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="bg-gray-900 border-gray-800">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Due Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-gray-900 border-gray-800"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : <span>Select a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-800">
                <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Button onClick={handleSubmit} className="w-full">
          Add Task
        </Button>
      </DialogContent>
    </Dialog>
  )
}

