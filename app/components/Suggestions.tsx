import { motion } from 'framer-motion'

interface MoodData {
  date: string
  text: string
  sentiment: string
  rating: number
}

interface SuggestionsProps {
  moodData: MoodData[]
}

export default function Suggestions({ moodData }: SuggestionsProps) {
  const getRecentMoodTrend = () => {
    if (moodData.length < 3) return null

    const recentMoods = moodData.slice(-3).map((entry) => entry.sentiment)
    const negativeCount = recentMoods.filter((mood) => mood === 'Negative').length

    if (negativeCount >= 2) {
      return 'negative'
    } else if (recentMoods.every((mood) => mood === 'Positive')) {
      return 'positive'
    }

    return null
  }

  const getSuggestion = () => {
    const trend = getRecentMoodTrend()

    if (trend === 'negative') {
      return (
        <motion.div 
          className="bg-yellow-100 dark:bg-yellow-900 p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold mb-3 text-yellow-800 dark:text-yellow-200">Feeling down lately?</h3>
          <p className="mb-4 text-yellow-700 dark:text-yellow-300">Here are some tips that might help:</p>
          <ul className="list-disc list-inside text-yellow-700 dark:text-yellow-300 space-y-2">
            <li>Practice deep breathing exercises for 5 minutes</li>
            <li>Take a short walk outside and enjoy nature</li>
            <li>Reach out to a friend or family member for a chat</li>
            <li>Consider talking to a mental health professional</li>
          </ul>
        </motion.div>
      )
    } else if (trend === 'positive') {
      return (
        <motion.div 
          className="bg-green-100 dark:bg-green-900 p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold mb-3 text-green-800 dark:text-green-200">Great job!</h3>
          <p className="text-green-700 dark:text-green-300">You've been feeling positive lately. Keep up the good work!</p>
        </motion.div>
      )
    }

    return null
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-300">Suggestions</h2>
      {getSuggestion()}
    </div>
  )
}

