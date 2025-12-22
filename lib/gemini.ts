import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function generateQuiz({
  topic,
  difficulty,
  numQuestions,
  examples,
}: {
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  numQuestions: number;
  examples: any[];
}) {
  const systemPrompt = `You are an expert Indian competitive exam question creator (UPSC, SSC, Banking).

EXAMPLES FROM QUESTION BANK (learn this exact style, structure, and tricky option patterns):
${JSON.stringify(examples, null, 2)}

RULES:
1. Generate NEW current affairs questions ONLY (use your knowledge of latest events)
2. EXACTLY ${numQuestions} questions
3. Difficulty: ${difficulty} (easy=straightforward, medium=tricky options, hard=very close distractors)
4. 4 options (A,B,C,D) - make 2-3 options VERY plausible/confusing
5. Output ONLY valid JSON array, no other text:

[
  {
    "question": "Full question text?",
    "options": ["A. Option one", "B. Option two", "C. Option three", "D. Option four"],
    "correctOption": "B",
    "difficulty": "${difficulty}",
    "explanation": "Short 1-2 sentence explanation why B is correct"
  }
]`;

  const result = await model.generateContent(systemPrompt);
  const response = await result.response;
  const text = response.text();

  // Clean and parse JSON safely
  const cleaned = text
    .trim()
    .replace(/```json/g, '') // remove ```json fences
    .replace(/```/g, '');    // remove plain ``` fences

  let questions: any[] = [];
  try {
    questions = JSON.parse(cleaned);
  } catch (err) {
    console.error('Failed to parse quiz JSON:', err);
    throw new Error('Invalid JSON returned by Gemini');
  }

  return questions;
}