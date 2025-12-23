// app/api/quiz/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getClient } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const quizId = params.id;
    const client = await getClient();
    
    const questions = await client.query(
      `SELECT id, question, options::text::jsonb as options 
       FROM questions 
       WHERE quiz_id = $1`,
      [quizId]
    );
    
    client.release();
    return NextResponse.json({ questions: questions.rows });
  } catch (error) {
    console.error('Quiz fetch error:', error);
    return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
  }
}
