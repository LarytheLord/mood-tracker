import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const quotes = [
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" }
]

export function MotivationalQuote() {
  const [quote, setQuote] = useState(quotes[0])

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(randomQuote)
  }, [])

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Daily Inspiration</CardTitle>
        <CardDescription className="text-gray-400">A quote to brighten your day</CardDescription>
      </CardHeader>
      <CardContent>
        <blockquote className="italic text-lg">&ldquo;{quote.text}&rdquo;</blockquote>
        <p className="text-right mt-2 text-gray-400">- {quote.author}</p>
      </CardContent>
    </Card>
  )
}

