'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [topic, setTopic] = useState('current affairs');
  const [difficulty, setDifficulty] = useState('medium');
  const [numQuestions, setNumQuestions] = useState(5);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const createQuiz = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, difficulty, numQuestions })
      });
      const data = await res.json();
      if (data.quizId) {
        router.push(`/quiz/${data.quizId}`);
      }
    } catch (error) {
      alert('Failed to generate quiz');
    }
    setLoading(false);
  };

  return (
    <main className="max-w-md mx-auto mt-10 p-6 border rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">AI Quiz Generator</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Topic</label>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="current affairs, economy, sports..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as any)}
            className="w-full p-2 border rounded"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1"># Questions</label>
          <input
            type="number"
            min={1}
            max={20}
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <button
          onClick={createQuiz}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded font-medium hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Generating...' : `Generate ${numQuestions} Questions`}
        </button>
      </div>
      
      <p className="text-xs text-gray-500 mt-4 text-center">
        Powered by Gemini API (Free Tier)
      </p>
    </main>
  );
}
