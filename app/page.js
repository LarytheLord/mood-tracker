'use client'

import { useState, useEffect } from 'react'
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { MoodHistory } from './components/MoodHistory'
import { MotivationalQuote } from './components/MotivationalQuote'
import { MoodAnalysis } from './components/MoodAnalysis'

const EMOJIS = {
  5: "😄",
  4: "🙂",
  3: "😐",
  2: "😕",
  1: "😢"
}

export default function MoodTracker() {
  const [moodText, setMoodText] = useState("")
  const [moodRating, setMoodRating] = useState(3)
  const [moodData, setMoodData] = useState([])

  useEffect(() => {
    // Load mood data from localStorage
    const savedMoodData = localStorage.getItem('moodData')
    if (savedMoodData) {
      setMoodData(JSON.parse(savedMoodData))
    } else {
      const mockData = [
        { date: '2023-01-17 05:00', mood: 3, text: "Just woke up, feeling okay." },
        { date: '2023-01-17 12:00', mood: 4, text: "Had a good lunch with friends." },
        { date: '2023-01-17 18:00', mood: 3, text: "Work was a bit stressful today." },
        { date: '2023-01-17 23:00', mood: 5, text: "Relaxing evening, feeling great!" },
      ]
      setMoodData(mockData)
      localStorage.setItem('moodData', JSON.stringify(mockData))
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newMood = {
      date: new Date().toISOString(),
      mood: moodRating,
      text: moodText
    }
    const updatedMoodData = [...moodData, newMood]
    setMoodData(updatedMoodData)
    localStorage.setItem('moodData', JSON.stringify(updatedMoodData))
    setMoodText("")
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">Mood Tracker</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Log Your Mood</CardTitle>
              <CardDescription className="text-gray-400">How are you feeling right now?</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex justify-center space-x-4">
                  {Object.entries(EMOJIS).map(([rating, emoji]) => (
                    <Button
                      key={rating}
                      variant={moodRating === Number(rating) ? "default" : "outline"}
                      className="text-2xl p-6"
                      onClick={() => setMoodRating(Number(rating))}
                      type="button"
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
                <Textarea
                  value={moodText}
                  onChange={(e) => setMoodText(e.target.value)}
                  placeholder="Describe your mood..."
                  className="bg-gray-700 border-gray-600 text-white"
                  rows={4}
                />
                <Button type="submit" className="w-full">
                  Log Mood
                </Button>
              </form>
            </CardContent>
          </Card>

          <MotivationalQuote />
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Mood Trends</CardTitle>
            <CardDescription className="text-gray-400">Your emotional journey over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  mood: {
                    label: "Mood Level",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={moodData.map(d => ({ ...d, date: new Date(d.date).toLocaleString() }))}>
                    <defs>
                      <linearGradient id="mood" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="date" 
                      stroke="#6b7280"
                      tick={{ fill: '#6b7280' }}
                    />
                    <YAxis 
                      domain={[1, 5]}
                      ticks={[1, 2, 3, 4, 5]}
                      stroke="#6b7280"
                      tick={{ fill: '#6b7280' }}
                    />
                    <ChartTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-gray-800 p-2 rounded border border-gray-700">
                              <p className="text-2xl">{EMOJIS[payload[0].value]}</p>
                              <p className="text-sm text-gray-400">{payload[0].payload.date}</p>
                              <p className="text-sm">{payload[0].payload.text}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="mood"
                      stroke="#8b5cf6"
                      fill="url(#mood)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MoodHistory moodData={moodData} />
          <MoodAnalysis moodData={moodData} />
        </div>
      </div>
    </div>
  )
}

