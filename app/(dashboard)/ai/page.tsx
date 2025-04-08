"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AIPage() {
  const [skill, setSkill] = useState("")
  const [timeframe, setTimeframe] = useState("")
  const [currentKnowledge, setCurrentKnowledge] = useState("")
  const [skillLevel, setSkillLevel] = useState("")
  const [hoursPerDay, setHoursPerDay] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [roadmap, setRoadmap] = useState<string | null>(null)
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!skill || !timeframe || !currentKnowledge || !skillLevel || !hoursPerDay) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to generate a roadmap.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      // In a real app, this would call your API to generate the roadmap using Gemini
      // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock response
      const mockRoadmap = `
# Learning Roadmap for ${skill}

## Overview
This personalized roadmap is designed for someone with ${currentKnowledge} knowledge, aiming to reach ${skillLevel} level in ${timeframe} by dedicating ${hoursPerDay} hours per day.

## Week 1: Fundamentals
- **Day 1**: Introduction to basic concepts (2 hours)
- **Day 2**: Setting up your learning environment (1 hour)
- **Day 3**: Core principles and terminology (2 hours)
- **Day 4**: Practical exercise: Simple project (3 hours)
- **Day 5**: Review and solidify understanding (2 hours)
- **Weekend**: Rest and reflect on what you've learned

## Week 2: Building Skills
- **Day 1**: Intermediate concepts (2 hours)
- **Day 2**: Problem-solving techniques (2 hours)
- **Day 3**: Advanced tools and resources (2 hours)
- **Day 4**: Practical exercise: Medium complexity project (3 hours)
- **Day 5**: Peer learning and feedback (2 hours)
- **Weekend**: Optional: Explore related topics

## Week 3: Advanced Techniques
- **Day 1**: Advanced methodologies (2 hours)
- **Day 2**: Industry best practices (2 hours)
- **Day 3**: Optimization and efficiency (2 hours)
- **Day 4**: Practical exercise: Complex project (4 hours)
- **Day 5**: Self-assessment and gap analysis (2 hours)
- **Weekend**: Prepare for final project

## Week 4: Mastery and Application
- **Day 1-3**: Final project work (6 hours)
- **Day 4**: Project refinement and documentation (2 hours)
- **Day 5**: Presentation and reflection (2 hours)
- **Weekend**: Plan for continued learning and next steps

## Resources
- Recommended books: "Beginner's Guide to ${skill}", "Advanced ${skill} Techniques"
- Online courses: ${skill} Fundamentals (Coursera), ${skill} Masterclass (Udemy)
- Communities: Reddit r/${skill}, Stack Overflow, Discord groups

## Tips for Success
- Maintain consistency with your ${hoursPerDay}-hour daily commitment
- Take notes and document your learning journey
- Join communities to learn from others
- Apply what you learn through practical projects
- Regularly review and adjust your goals
      `

      setRoadmap(mockRoadmap)

      toast({
        title: "Roadmap generated",
        description: "Your personalized learning roadmap has been created.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate roadmap. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSaveToTasks = () => {
    if (!roadmap) return

    // In a real app, this would call your API to save the roadmap as tasks
    toast({
      title: "Roadmap saved",
      description: "Your roadmap has been converted to tasks.",
    })
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">AI Learning Roadmap Generator</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-950 border-gray-800">
          <CardHeader>
            <CardTitle>Generate Your Learning Roadmap</CardTitle>
            <CardDescription>Tell us what you want to learn and we'll create a personalized roadmap.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="skill" className="text-sm font-medium">
                  What skill do you want to learn?
                </label>
                <Input
                  id="skill"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  placeholder="e.g., JavaScript, Machine Learning, Digital Marketing"
                  className="bg-gray-900 border-gray-800"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="timeframe" className="text-sm font-medium">
                  How much time do you have to learn this skill?
                </label>
                <Input
                  id="timeframe"
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  placeholder="e.g., 4 weeks, 3 months"
                  className="bg-gray-900 border-gray-800"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="knowledge" className="text-sm font-medium">
                  What is your current knowledge about this skill?
                </label>
                <Textarea
                  id="knowledge"
                  value={currentKnowledge}
                  onChange={(e) => setCurrentKnowledge(e.target.value)}
                  placeholder="Describe your current understanding or experience"
                  className="bg-gray-900 border-gray-800 min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Desired skill level</label>
                  <Select value={skillLevel} onValueChange={setSkillLevel}>
                    <SelectTrigger className="bg-gray-900 border-gray-800">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                      <SelectItem value="master">Master</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Hours per day</label>
                  <Select value={hoursPerDay} onValueChange={setHoursPerDay}>
                    <SelectTrigger className="bg-gray-900 border-gray-800">
                      <SelectValue placeholder="Select hours" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="2">2 hours</SelectItem>
                      <SelectItem value="3">3 hours</SelectItem>
                      <SelectItem value="4">4+ hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Roadmap
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-950 border-gray-800">
          <CardHeader>
            <CardTitle>Your Learning Roadmap</CardTitle>
            <CardDescription>
              {roadmap ? "Here's your personalized learning plan" : "Generate a roadmap to see it here"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {roadmap ? (
              <div className="space-y-4">
                <div className="prose prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap bg-gray-900 p-4 rounded-md overflow-auto max-h-[500px]">
                    {roadmap}
                  </pre>
                </div>

                <Button onClick={handleSaveToTasks} className="w-full">
                  Save to Tasks
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-center text-gray-400">
                <Sparkles className="h-12 w-12 mb-4" />
                <p>Fill in the form and generate your personalized learning roadmap</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

