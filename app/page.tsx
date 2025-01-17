'use client'

import { useState, useEffect } from 'react'
import MoodInput from './components/MoodInput'
import MoodTrends from './components/MoodTrends'
import Suggestions from './components/Suggestions'
import { motion } from 'framer-motion'

export default function Home() {
  const [moodData, setMoodData] = useState([])

  useEffect(() => {
    fetchMoodData()
  }, [])

  const fetchMoodData = async () => {
    try {
      const response = await fetch('/api/mood')
      if (response.ok) {
        const data = await response.json()
        setMoodData(data)
      }
    } catch (error) {
      console.error('Error fetching mood data:', error)
    }
  }

  const handleMoodSubmit = async (text: string, rating: number) => {
    try {
      const response = await fetch('/api/mood', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, rating }),
      })
      if (response.ok) {
        fetchMoodData()
      }
    } catch (error) {
      console.error('Error submitting mood:', error)
    }
  }

  const handleClearData = async () => {
    try {
      const response = await fetch('/api/mood', {
        method: 'DELETE',
      })
      if (response.ok) {
        setMoodData([])
      }
    } catch (error) {
      console.error('Error clearing mood data:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-gray-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-12">
        <motion.h1 
          className="text-5xl font-bold mb-12 text-center text-indigo-800 dark:text-indigo-200"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Mood Tracker
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <MoodInput onSubmit={handleMoodSubmit} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <MoodTrends moodData={moodData} />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Suggestions moodData={moodData} />
        </motion.div>
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <button
            onClick={handleClearData}
            className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Clear All Data
          </button>
        </motion.div>
      </div>
    </div>
  )
}

