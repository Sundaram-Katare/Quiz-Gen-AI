import { NextRequest, NextResponse } from 'next/server';
import { getClient } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const client = await getClient();
    
    const attempts = await client.query(
      `SELECT 
         a.score, a.max_score, a.percentage, a.created_at,
         q.topic, q.difficulty
       FROM attempts a
       JOIN quizzes q ON a.quiz_id = q.id
       WHERE a.user_id = $1 OR $1 IS NULL
       ORDER BY a.created_at DESC
       LIMIT 10`,
      [userId || null]
    );

    const avgPercentage = attempts.rows.length > 0 
      ? Math.round(attempts.rows.reduce((sum: number, row: any) => sum + row.percentage, 0) / attempts.rows.length)
      : 0;

    client.release();
    return NextResponse.json({
      attempts: attempts.rows,
      averageScore: avgPercentage,
      totalAttempts: attempts.rows.length
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load profile' }, { status: 500 });
  }
}
