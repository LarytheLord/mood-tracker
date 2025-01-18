import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const EMOJIS = {
  5: "😄",
  4: "🙂",
  3: "😐",
  2: "😕",
  1: "😢"
}

export function MoodHistory({ moodData }) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Mood History</CardTitle>
        <CardDescription className="text-gray-400">Your recent mood entries</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          {moodData.slice().reverse().map((entry, index) => (
            <div key={index} className="mb-4 p-3 bg-gray-700 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl">{EMOJIS[entry.mood]}</span>
                <span className="text-sm text-gray-400">{new Date(entry.date).toLocaleString()}</span>
              </div>
              <p className="text-sm">{entry.text}</p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

