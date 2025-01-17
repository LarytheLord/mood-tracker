import { useState } from 'react'
import { motion } from 'framer-motion'

interface MoodInputProps {
  onSubmit: (text: string, rating: number) => void
}

export default function MoodInput({ onSubmit }: MoodInputProps) {
  const [text, setText] = useState('')
  const [rating, setRating] = useState(3)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(text, rating)
    setText('')
    setRating(3)
  }

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-300">How are you feeling today?</h2>
      <div className="mb-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          rows={3}
          placeholder="Express your feelings..."
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="mood-rating" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Rate your mood:
        </label>
        <input
          type="range"
          id="mood-rating"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <div className="flex justify-between mt-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <span 
              key={value} 
              className={`text-sm font-medium ${rating === value ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}
            >
              {value}
            </span>
          ))}
        </div>
      </div>
      <motion.button
        type="submit"
        className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Log Mood
      </motion.button>
    </motion.form>
  )
}

