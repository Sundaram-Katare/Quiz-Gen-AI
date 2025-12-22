import { NextRequest, NextResponse } from 'next/server';
import { getClient } from '@/lib/db';
import { generateQuiz } from '@/lib/gemini';
import { getRelevantExamples } from '@/lib/questionBank';

export async function POST(req: NextRequest) {
  try {
    const { topic, difficulty, numQuestions, userId } = await req.json();

    if (!topic || !difficulty || !numQuestions) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const examples = getRelevantExamples(topic, difficulty);
    const generatedQuestions = await generateQuiz({
      topic,
      difficulty: difficulty as any,
      numQuestions,
      examples
    });

    const client = await getClient();
    try {
      // Create quiz record
      const quizRes = await client.query(
        `INSERT INTO quizzes (user_id, topic, difficulty, num_questions) 
         VALUES ($1, $2, $3, $4) RETURNING id`,
        [userId || null, topic, difficulty, numQuestions]
      );
      const quizId = quizRes.rows.id ;

      // Save questions
      for (const q of generatedQuestions) {
        await client.query(
          `INSERT INTO questions (quiz_id, question, options, correct_option, difficulty, explanation)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            quizId,
            q.question,
            JSON.stringify(q.options),
            q.correctOption,
            q.difficulty,
            q.explanation || ''
          ]
        );
      }

      // Return quiz for frontend (hide correct answers)
      const quizQuestions = await client.query(
        `SELECT id, question, options FROM questions WHERE quiz_id = $1`,
        [quizId]
      );

      return NextResponse.json({
        quizId: quizId.toString(),
        questions: quizQuestions.rows
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Quiz generation error:', error);
    return NextResponse.json({ error: 'Failed to generate quiz' }, { status: 500 });
  }
}
