// app/api/quiz/generate/route.ts - TEMP NO-DB VERSION
import { NextRequest, NextResponse } from 'next/server';
import { generateQuiz } from '@/lib/gemini';
import { getRelevantExamples } from '@/lib/questionBank';

export async function POST(req: NextRequest) {
  try {
    const { topic, difficulty, numQuestions } = await req.json();

    const examples = getRelevantExamples(topic, difficulty);
    const generatedQuestions = await generateQuiz({
      topic,
      difficulty: difficulty as any,
      numQuestions: Number(numQuestions) || 5,
      examples
    });

    // TEMP: Return directly without DB
    return NextResponse.json({
      quizId: 'demo-' + Date.now(),
      questions: generatedQuestions.map((q: any, idx: number) => ({
        id: `q${idx}`,
        question: q.question,
        options: q.options || ['A. Option 1', 'B. Option 2', 'C. Option 3', 'D. Option 4']
      }))
    });
  } catch (error) {
    console.error('Quiz generation error:', error);
    return NextResponse.json({ 
      error: 'Failed to generate quiz',
      details: process.env.NODE_ENV === 'development' ? error : undefined 
    }, { status: 500 });
  }
}
