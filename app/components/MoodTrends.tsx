'use client'

import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import { motion } from 'framer-motion'

interface MoodData {
  date: string
  text: string
  sentiment: string
  rating: number
}

interface MoodTrendsProps {
  moodData: MoodData[]
}

export default function MoodTrends({ moodData }: MoodTrendsProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy()
        }

        const labels = moodData.map((entry) => entry.date)
        const ratings = moodData.map((entry) => entry.rating)

        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Mood Rating',
                data: ratings,
                borderColor: 'rgb(99, 102, 241)',
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                tension: 0.4,
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                max: 5,
                ticks: {
                  stepSize: 1,
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        })
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [moodData])

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-300">Mood Trends</h2>
      <canvas ref={chartRef} />
    </motion.div>
  )
}

