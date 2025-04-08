import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { connectToDatabase } from "@/utils/db"

export async function POST(request: Request) {
  try {
    const session = await getServerSession()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { skill, timeframe, currentKnowledge, skillLevel, hoursPerDay } = body

    if (!skill || !timeframe || !currentKnowledge || !skillLevel || !hoursPerDay) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const prompt = `
      Create a detailed learning roadmap for ${skill}.
      
      User information:
      - Current knowledge: ${currentKnowledge}
      - Desired skill level: ${skillLevel}
      - Available time: ${timeframe}
      - Hours per day: ${hoursPerDay}
      
      The roadmap should include:
      1. A day-by-day breakdown of learning activities
      2. Specific tasks and goals for each day
      3. Recommended resources (books, courses, websites)
      4. Practical exercises and projects
      5. Milestones to track progress
      
      Format the roadmap in Markdown with clear sections and bullet points.
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      system:
        "You are an expert educational consultant who creates personalized learning roadmaps. Your roadmaps are detailed, practical, and tailored to the user's specific needs and constraints.",
    })

    return NextResponse.json({ roadmap: text })
  } catch (error) {
    console.error("Error generating roadmap:", error)
    return NextResponse.json({ error: "Failed to generate roadmap" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { roadmap } = body

    if (!roadmap) {
      return NextResponse.json({ error: "Missing roadmap content" }, { status: 400 })
    }

    // Parse the roadmap and convert it to tasks
    // This is a simplified version - in a real app, you'd want more robust parsing
    const lines = roadmap.split("\n")
    const tasks = []

    let currentDay = null

    for (const line of lines) {
      if (line.includes("**Day")) {
        currentDay = line.match(/Day\s+(\d+)/)?.[1]
      } else if (line.startsWith("- ") && currentDay) {
        const taskTitle = line.replace("- ", "").split("(")[0].trim()

        if (taskTitle) {
          const today = new Date()
          const dueDate = new Date()
          dueDate.setDate(today.getDate() + Number.parseInt(currentDay) - 1)

          tasks.push({
            userId: session.user.id,
            title: taskTitle,
            description: `Part of your learning roadmap for day ${currentDay}`,
            status: "pending",
            priority: "medium",
            dueDate,
            createdAt: new Date(),
          })
        }
      }
    }

    const { db } = await connectToDatabase()

    if (tasks.length > 0) {
      await db.collection("tasks").insertMany(tasks)
    }

    return NextResponse.json({ success: true, tasksCreated: tasks.length })
  } catch (error) {
    console.error("Error converting roadmap to tasks:", error)
    return NextResponse.json({ error: "Failed to convert roadmap to tasks" }, { status: 500 })
  }
}

