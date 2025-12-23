'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

type Question = { id: string; question: string; options: string[] };
type Answer = { questionId: string; selectedOption: string };

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.id as string;
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedQuiz = sessionStorage.getItem(`quiz_${quizId}`);
    if (storedQuiz) {
      const quizData = JSON.parse(storedQuiz);
      setQuestions(quizData);
      setLoading(false);
    } else {
      // Fallback: try API
      fetch(`/api/quiz/${quizId}`)
        .then(res => res.json())
        .then(data => {
          if (data.questions) {
            setQuestions(data.questions);
          }
          setLoading(false);
        })
        .catch(() => {
          alert('Quiz not found. Go back and create a new one.');
          router.push('/');
          setLoading(false);
        });
    }
  }, [quizId, router]);

  const submitQuiz = async () => {
    if (Object.keys(answers).length !== questions.length) {
      alert('Please answer all questions!');
      return;
    }

    const answersArray: Answer[] = Object.entries(answers).map(([questionId, selectedOption]) => ({
      questionId,
      selectedOption
    }));

    // Simple scoring (random correct answers for demo)
    const score = answersArray.filter((_, idx) => Math.random() > 0.5).length;
    const percentage = Math.round((score / questions.length) * 100);

    setResult({
      score,
      maxScore: questions.length,
      percentage
    });

    // Save to session for profile
    sessionStorage.setItem('latestQuizResult', JSON.stringify({
      quizId,
      score,
      maxScore: questions.length,
      percentage,
      topic: 'Demo',
      difficulty: 'medium',
      created_at: new Date().toISOString()
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading quiz...</div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-xl mb-4">Quiz not found</h2>
          <button 
            onClick={() => router.push('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            ← Create New Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <button 
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          ← Back
        </button>
        
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Quiz #{quizId.slice(-6)}</h1>
        
        <div className="space-y-6 mb-8">
          {questions.map((q, idx) => (
            <div key={q.id || idx} className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="font-semibold text-lg mb-6 text-gray-900">{q.question}</h3>
              <div className="space-y-3">
                {q.options.map((option, optIdx) => {
                  const letter = String.fromCharCode(65 + optIdx); // A,B,C,D
                  return (
                    <label key={letter} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-all group">
                      <input
                        type="radio"
                        name={`q${idx}`}
                        value={letter}
                        checked={answers[q.id || idx.toString()] === letter}
                        onChange={() => setAnswers(prev => ({ 
                          ...prev, 
                          [q.id || idx.toString()]: letter 
                        }))}
                        className="mr-4 w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-900 group-hover:text-gray-800">
                        {letter}. {option}
                      </span>
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
          className="w-full bg-green-500 text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all"
        >
          ✅ Submit Quiz ({Object.keys(answers).length}/{questions.length} answered)
        </button>

        {result && (
          <div className="mt-12 p-8 bg-gradient-to-r from-green-50 to-blue-50 border-4 border-green-200 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-green-800">🎉 Results</h2>
            <div className="text-5xl font-black text-green-600 mb-4">
              {result.percentage}%
            </div>
            <div className="text-xl mb-8 text-gray-700">
              {result.score}/{result.maxScore} correct
            </div>
            <div className="flex gap-4">
              <a 
                href="/profile" 
                className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-600 text-center"
              >
                📊 View Profile
              </a>
              <button
                onClick={() => router.push('/')}
                className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-600 text-center"
              >
                🔄 New Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
