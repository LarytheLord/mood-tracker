import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data', 'mood_data.json')

export async function GET() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return NextResponse.json([])
    }

    const data = fs.readFileSync(dataFilePath, 'utf-8')
    const moodData = JSON.parse(data)
    return NextResponse.json(moodData)
  } catch (error) {
    console.error('Error reading mood data:', error)
    return NextResponse.json({ error: 'Error reading mood data' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { text, rating } = await req.json()

    // Here, you would typically call your Python backend for sentiment analysis
    // For now, we'll use a simple placeholder function
    const sentiment = analyzeSentiment(text)

    const newEntry = {
      date: new Date().toISOString().split('T')[0],
      text,
      sentiment,
      rating,
    }

    let moodData = []
    if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath, 'utf-8')
      moodData = JSON.parse(data)
    }

    moodData.push(newEntry)
    fs.writeFileSync(dataFilePath, JSON.stringify(moodData, null, 2))

    return NextResponse.json({ message: 'Mood logged successfully' })
  } catch (error) {
    console.error('Error logging mood:', error)
    return NextResponse.json({ error: 'Error logging mood' }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    if (fs.existsSync(dataFilePath)) {
      fs.unlinkSync(dataFilePath)
    }
    return NextResponse.json({ message: 'Mood data cleared successfully' })
  } catch (error) {
    console.error('Error clearing mood data:', error)
    return NextResponse.json({ error: 'Error clearing mood data' }, { status: 500 })
  }
}

// Placeholder function for sentiment analysis
function analyzeSentiment(text: string): string {
  const lowercaseText = text.toLowerCase()
  if (lowercaseText.includes('happy') || lowercaseText.includes('good') || lowercaseText.includes('great')) {
    return 'Positive'
  } else if (lowercaseText.includes('sad') || lowercaseText.includes('bad') || lowercaseText.includes('angry')) {
    return 'Negative'
  }
  return 'Neutral'
}

