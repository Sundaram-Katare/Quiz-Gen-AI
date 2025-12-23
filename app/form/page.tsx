'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [topic, setTopic] = useState('current affairs')
  const [difficulty, setDifficulty] = useState('medium')
  const [numQuestions, setNumQuestions] = useState(5)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const createQuiz = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          difficulty,
          numQuestions: Number(numQuestions),
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || `HTTP ${res.status}`)
      }

      const data = await res.json()

      if (data.quizId && data.questions) {
        sessionStorage.setItem(
          `quiz_${data.quizId}`,
          JSON.stringify(data.questions)
        )
        router.push(`/quiz/${data.quizId}`)
      } else {
        throw new Error('Invalid quiz response')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create quiz')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-green-200 rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
          AI Quiz Generator
        </h1>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">
              Topic
            </label>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="current affairs, economy, sports..."
              className="w-full rounded-lg border border-green-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full rounded-lg border border-green-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="easy">🟢 Easy</option>
              <option value="medium">🟡 Medium</option>
              <option value="hard">🔴 Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">
              Number of Questions
            </label>
            <input
              type="number"
              min={1}
              max={10}
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
              className="w-full rounded-lg border border-green-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            onClick={createQuiz}
            disabled={loading}
            className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? '🤖 Generating Quiz...'
              : `✨ Generate ${numQuestions} Questions`}
          </button>
        </div>

        <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
          <p className="text-xs text-green-800">
            💡 Powered by <strong>Google Gemini API</strong> (Free Tier)
          </p>
        </div>
      </div>
    </main>
  )
}
