import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function MoodAnalysis({ moodData }) {
  const calculateAverageMood = () => {
    if (moodData.length === 0) return 0
    const sum = moodData.reduce((acc, entry) => acc + entry.mood, 0)
    return (sum / moodData.length).toFixed(2)
  }

  const getMostFrequentMood = () => {
    if (moodData.length === 0) return 'N/A'
    const moodCounts = moodData.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1
      return acc
    }, {})
    const mostFrequent = Object.entries(moodCounts).reduce((a, b) => a[1] > b[1] ? a : b)
    return mostFrequent[0]
  }

  const getEmoji = (mood) => {
    const emojis = { 5: "😄", 4: "🙂", 3: "😐", 2: "😕", 1: "😢" }
    return emojis[mood] || ''
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Mood Analysis</CardTitle>
        <CardDescription className="text-gray-400">Insights into your emotional patterns</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-gray-400">Average Mood:</p>
            <p className="text-2xl font-bold">{calculateAverageMood()} / 5</p>
          </div>
          <div>
            <p className="text-gray-400">Most Frequent Mood:</p>
            <p className="text-2xl font-bold">{getEmoji(getMostFrequentMood())} ({getMostFrequentMood()} / 5)</p>
          </div>
          <div>
            <p className="text-gray-400">Total Entries:</p>
            <p className="text-2xl font-bold">{moodData.length}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

