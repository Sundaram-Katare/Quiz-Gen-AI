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
      `SELECT id, question, options FROM questions WHERE quiz_id = $1`,
      [quizId]
    );
    
    client.release();
    return NextResponse.json({ questions: questions.rows });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load quiz' }, { status: 500 });
  }
}
