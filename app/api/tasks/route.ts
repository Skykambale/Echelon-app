import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: Request) {
  try {
    const session = await getServerSession()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date")
    const status = searchParams.get("status")

    const { db } = await connectToDatabase()

    const query: any = { userId: session.user.id }

    if (date) {
      const startDate = new Date(date)
      startDate.setHours(0, 0, 0, 0)

      const endDate = new Date(date)
      endDate.setHours(23, 59, 59, 999)

      query.dueDate = { $gte: startDate, $lte: endDate }
    }

    if (status && status !== "all") {
      query.status = status === "completed" ? "done" : { $ne: "done" }
    }

    const tasks = await db.collection("tasks").find(query).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(tasks)
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, status, priority, dueDate } = body

    if (!title || !status || !priority || !dueDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    const task = {
      userId: session.user.id,
      title,
      description,
      status,
      priority,
      dueDate: new Date(dueDate),
      createdAt: new Date(),
    }

    const result = await db.collection("tasks").insertOne(task)

    return NextResponse.json({
      ...task,
      _id: result.insertedId,
    })
  } catch (error) {
    console.error("Error creating task:", error)
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
  }
}

