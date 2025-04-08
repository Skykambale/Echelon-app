import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <p className="text-sm text-gray-400 mt-1">2 due today</p>
            <Link href="/tasks">
              <Button variant="link" className="p-0 mt-4 flex items-center gap-1">
                View all tasks <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Productivity Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78%</div>
            <p className="text-sm text-gray-400 mt-1">+12% from last week</p>
            <Link href="/visualize">
              <Button variant="link" className="p-0 mt-4 flex items-center gap-1">
                View analytics <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learning Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3/7</div>
            <p className="text-sm text-gray-400 mt-1">Days completed</p>
            <Link href="/ai">
              <Button variant="link" className="p-0 mt-4 flex items-center gap-1">
                View roadmap <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

