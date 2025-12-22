import { NextRequest, NextResponse } from 'next/server';
import { getClient } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { quizId, userId, answers } = await req.json();

    const client = await getClient();
    try {
      // Get quiz questions with answers
      const questions = await client.query(
        `SELECT id, correct_option, difficulty 
         FROM questions WHERE quiz_id = $1`,
        [quizId]
      );

      const difficultyWeights = { easy: 1, medium: 2, hard: 3 };
      let score = 0;
      let maxScore = 0;

      for (const question of questions.rows) {
        const userAnswer = answers.find((a: any) => a.questionId === question.id);
        const isCorrect = userAnswer?.selectedOption === question.correct_option;
        
        const weight = difficultyWeights[question.difficulty as keyof typeof difficultyWeights] || 1;
        maxScore += weight;
        if (isCorrect) score += weight;
      }

      const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

      // Save attempt
      await client.query(
        `INSERT INTO attempts (user_id, quiz_id, answers, score, max_score, percentage)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [userId || null, quizId, JSON.stringify(answers), score, maxScore, percentage]
      );

      return NextResponse.json({
        success: true,
        score,
        maxScore,
        percentage
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Submit error:', error);
    return NextResponse.json({ error: 'Failed to submit quiz' }, { status: 500 });
  }
}
