"use client"

interface TaskListProps {
  day: string
}

export function TaskList({ day }: TaskListProps) {
  // Mock data - in a real app, this would be fetched based on the selected day
  const tasks = [
    {
      id: 1,
      title: "Team meeting",
      status: "done",
      tag: "work",
    },
    {
      id: 2,
      title: "Project proposal",
      status: "done",
      tag: "work",
    },
    {
      id: 3,
      title: "Study for exam",
      status: "in-progress",
      tag: "academics",
    },
  ]

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-900">
          <div
            className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center ${task.status === "done" ? "bg-emerald-500" : "border-2 border-amber-500"}`}
          >
            {task.status === "done" && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 3L4.5 8.5L2 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>

          <div className="flex-1">
            <h4 className="font-medium">{task.title}</h4>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-sm text-gray-400">Status: {task.status === "done" ? "Done" : "In-progress"}</span>
            </div>
          </div>

          <div
            className={`px-2 py-1 text-xs rounded ${task.tag === "work" ? "bg-purple-900 text-purple-300" : "bg-pink-900 text-pink-300"}`}
          >
            {task.tag}
          </div>
        </div>
      ))}
    </div>
  )
}

