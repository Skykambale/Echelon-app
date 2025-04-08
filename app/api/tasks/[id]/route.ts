import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { db } = await connectToDatabase()

    const task = await db.collection("tasks").findOne({
      _id: new ObjectId(params.id),
      userId: session.user.id,
    })

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error("Error fetching task:", error)
    return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    const { db } = await connectToDatabase()

    const task = await db.collection("tasks").findOne({
      _id: new ObjectId(params.id),
      userId: session.user.id,
    })

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    const result = await db
      .collection("tasks")
      .updateOne({ _id: new ObjectId(params.id) }, { $set: { ...body, updatedAt: new Date() } })

    return NextResponse.json({ success: true, modifiedCount: result.modifiedCount })
  } catch (error) {
    console.error("Error updating task:", error)
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { db } = await connectToDatabase()

    const task = await db.collection("tasks").findOne({
      _id: new ObjectId(params.id),
      userId: session.user.id,
    })

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    await db.collection("tasks").deleteOne({ _id: new ObjectId(params.id) })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting task:", error)
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 })
  }
}

