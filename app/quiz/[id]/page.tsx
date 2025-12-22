'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type Question = { id: string; question: string; options: string[] };
type Answer = { questionId: string; selectedOption: string };

export default function QuizPage() {
  const params = useParams();
  const quizId = params.id as string;
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  const fetchQuiz = async () => {
    const res = await fetch(`/api/quiz/${quizId}`);
    const data = await res.json();
    setQuestions(data.questions);
    setLoading(false);
  };

  const submitQuiz = async () => {
    const answersArray: Answer[] = Object.entries(answers).map(([questionId, selectedOption]) => ({
      questionId,
      selectedOption
    }));

    const res = await fetch('/api/quiz/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizId, answers: answersArray })
    });

    const data = await res.json();
    setResult(data);
  };

  if (loading) return <div className="p-8 text-center">Loading quiz...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">Take Quiz #{quizId.slice(-4)}</h1>
      
      <div className="space-y-6 mb-8">
        {questions.map((q) => (
          <div key={q.id} className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-4 text-lg">{q.question}</h3>
            <div className="space-y-2">
              {q.options.map((option, idx) => {
                const letter = String.fromCharCode(65 + idx); // A,B,C,D
                return (
                  <label key={letter} className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name={q.id}
                      value={letter}
                      checked={answers[q.id] === letter}
                      onChange={() => setAnswers(prev => ({ ...prev, [q.id]: letter }))}
                      className="mr-3 w-4 h-4 text-blue-600"
                    />
                    <span>{letter}. {option}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={submitQuiz}
        disabled={Object.keys(answers).length !== questions.length}
        className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit Quiz ({Object.keys(answers).length}/{questions.length} answered)
      </button>

      {result && (
        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-green-800">Results</h2>
          <div className="text-3xl font-bold text-green-600 mb-2">
            {result.score}/{result.maxScore}
          </div>
          <div className="text-lg mb-4">
            {result.percentage}% correct
          </div>
          <a href="/profile" className="text-blue-600 hover:underline">
            View Profile & Trends →
          </a>
        </div>
      )}
    </div>
  );
}
