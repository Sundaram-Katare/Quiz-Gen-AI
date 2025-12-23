// lib/gemini.ts - REGEX ERROR FIXED
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export type GeneratedQuestion = {
  question: string;
  options: string[];
  correctOption: string;
  difficulty: string;
  explanation: string;
};

export async function generateQuiz({
  topic,
  difficulty,
  numQuestions,
  examples
}: {
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  numQuestions: number;
  examples: any[];
}): Promise<GeneratedQuestion[]> {

  const exampleSlice = examples.slice(0, 3);

  // Updated prompt: Dynamic, JSON-focused, includes examples if available
  const systemInstruction = `Generate ${numQuestions} multiple-choice questions on the topic "${topic}" with "${difficulty}" difficulty. Each question must have:
- question: string
- options: array of 4 strings (A, B, C, D)
- correctOption: string (A, B, C, or D)
- explanation: string

Return ONLY a valid JSON array of objects. No extra text.

${examples.length > 0 ? `Examples: ${JSON.stringify(exampleSlice)}` : ''}`;

  try {
    console.log('🤖 Calling Gemini...');

    const result = await model.generateContent(systemInstruction);
    const response = await result.response;
    const text = response.text();

    console.log('📄 Raw response:', text?.substring(0, 100));

    if (!text) {
      throw new Error('No response from Gemini');
    }

    // FIXED REGEX - Clean response properly
    const cleaned = text
      .trim()
      .replace(/```json|```/g, '')   // Remove ```json and ```
      .replace(/```/g, '')           // Remove any remaining ```
      .replace(/^\s*[\r\n]/gm, '')   // Remove leading newlines
      .trim();

    console.log('🧹 Cleaned:', cleaned.substring(0, 100));

    let questions: any[];
    try {
      questions = JSON.parse(cleaned);
    } catch (parseError) {
      console.error('JSON parse failed. Raw text:', cleaned);
      throw new Error('Gemini response not valid JSON');
    }

    if (!Array.isArray(questions)) {
      throw new Error('Not an array from Gemini');
    }

    // Validate and fix questions
    const validQuestions = questions
      .slice(0, numQuestions)
      .map((q: any): GeneratedQuestion => ({
        question: q.question || `${topic} sample question`,
        options: Array.isArray(q.options) && q.options.length >= 4
          ? q.options.slice(0, 4)
          : ['A. Option 1', 'B. Option 2', 'C. Option 3', 'D. Option 4'],
        correctOption: ['A', 'B', 'C', 'D'].includes(String(q.correctOption)?.[0] || 'B')
          ? String(q.correctOption)[0]
          : 'B',
        difficulty: q.difficulty || difficulty,
        explanation: q.explanation || 'AI generated',
      }));

    console.log(`✅ Generated ${validQuestions.length} questions`);
    return validQuestions;

  } catch (error: any) {
    console.error('❌ Gemini failed:', error.message);
    return generateFallbackQuestions(numQuestions, difficulty, topic);
  }
}

function generateFallbackQuestions(numQuestions: number, difficulty: string, topic: string): GeneratedQuestion[] {
  return Array(numQuestions).fill(0).map((_, i) => ({
    question: `What is the latest ${topic} news? (Q${i + 1})`,
    options: [
      'A. Policy change',
      'B. International deal',
      'C. Economic reform',
      'D. New scheme'
    ],
    correctOption: 'B',
    difficulty,
    explanation: `Demo question ${i + 1}`
  }));
}
