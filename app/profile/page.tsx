'use client';
import { useEffect, useState } from 'react';

type Attempt = {
  score: number;
  max_score: number;
  percentage: number;
  created_at: string;
  topic: string;
  difficulty: string;
};

export default function Profile() {
  const [data, setData] = useState<{ attempts: Attempt[]; averageScore: number; totalAttempts: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user/demo/profile')
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center">Loading profile...</div>;
  if (!data) return <div className="p-8 text-center">No data found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Quiz Profile</h1>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800">Average Score</h3>
          <div className="text-3xl font-bold text-blue-600">{data.averageScore}%</div>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800">Total Quizzes</h3>
          <div className="text-3xl font-bold text-green-600">{data.totalAttempts}</div>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-800">Recent Trend</h3>
          <div className="text-xl font-bold text-purple-600">
            {data.averageScore > 70 ? '📈 Improving' : '📉 Keep Practicing'}
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Topic</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Difficulty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.attempts.map((attempt, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {new Date(attempt.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{attempt.topic}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    attempt.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    attempt.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {attempt.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <span className={`${
                    attempt.percentage >= 80 ? 'text-green-600' :
                    attempt.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {attempt.percentage}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-400">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <a href="/" className="font-medium hover:underline">← Create New Quiz</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  ); 
}
