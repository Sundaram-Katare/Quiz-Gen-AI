// Sample from your Google Doc - replace with actual questions when you access it
export type QuestionExample = {
  question: string;
  options: string[];
  correctOption: string;
  difficulty: string;
  explanation?: string;
};

export const QUESTION_BANK: QuestionExample[] = [
  {
    question: "Consider the following countries: 1. Finland 2. Germany 3. Norway 4. Russia. How many of the above countries have a border with the North Sea?",
    options: ["A. Only one", "B. Only two", "C. Only three", "D. All four"],
    correctOption: "B",
    difficulty: "medium",
    explanation: "Germany and Norway border the North Sea. Finland borders the Baltic Sea."
  },
  {
    question: "The longest border between any two countries in the world is between:",
    options: ["A. Canada and USA", "B. Chile and Argentina", "C. China and India", "D. Kazakhstan and Russia"],
    correctOption: "A",
    difficulty: "easy",
    explanation: "The Canada-US border is approximately 8,891 km long."
  },
  {
    question: "Consider the following statements: 1. The Red Sea receives very little precipitation. 2. No water enters the Red Sea from rivers. Which of the statements given above is/are correct?",
    options: ["A. 1 only", "B. 2 only", "C. Both 1 and 2", "D. Neither 1 nor 2"],
    correctOption: "C",
    difficulty: "medium",
    explanation: "The Red Sea is in an arid region with minimal rainfall, and no permanent rivers drain into it."
  },
  {
    question: "How many of the following countries share a land border with Ukraine? 1. Bulgaria 2. Czech Republic 3. Hungary 4. Latvia 5. Lithuania 6. Romania",
    options: ["A. Only two", "B. Only three", "C. Only four", "D. Only five"],
    correctOption: "A",
    difficulty: "medium",
    explanation: "Hungary and Romania share borders with Ukraine from the given list."
  },
  {
    question: "Which of the following countries have borders with Afghanistan? 1. Azerbaijan 2. Kyrgyzstan 3. Tajikistan 4. Turkmenistan 5. Uzbekistan",
    options: ["A. 1, 2 & 5 only", "B. 1, 2, 3 & 4 only", "C. 3, 4 & 5 only", "D. 1, 2, 3, 4 & 5"],
    correctOption: "C",
    difficulty: "hard",
    explanation: "Afghanistan shares borders with Tajikistan, Turkmenistan, and Uzbekistan."
  },
  {
    question: "Consider the following pairs: 1. Namcha Barwa - Garhwal Himalaya 2. Nanda Devi - Kumaon Himalaya 3. Nokrek - Sikkim Himalaya. Which of the pairs given above is/are correctly matched?",
    options: ["A. 1 and 2 only", "B. 2 only", "C. 1 and 3 only", "D. 3 only"],
    correctOption: "B",
    difficulty: "medium",
    explanation: "Namcha Barwa is in Arunachal Pradesh, Nanda Devi is in Kumaon Himalaya ✓, Nokrek is in Meghalaya."
  },
  {
    question: "Consider the following pairs: 1. Mekong - Andaman Sea 2. Thames - Irish Sea 3. Volga - Caspian Sea 4. Zambezi - Indian Ocean. Which of the pairs given above is/are correctly matched?",
    options: ["A. 1 and 2 only", "B. 3 only", "C. 3 and 4 only", "D. 1, 2 and 4 only"],
    correctOption: "C",
    difficulty: "medium",
    explanation: "Volga flows into Caspian Sea ✓, Zambezi into Indian Ocean ✓. Mekong flows into South China Sea, Thames into North Sea."
  },
  {
    question: "Consider the following pairs: 1. Adriatic Sea - Albania 2. Black Sea - Croatia 3. Caspian Sea - Kazakhstan 4. Mediterranean - Morocco 5. Red Sea - Syria. Which of the pairs given above are correctly matched?",
    options: ["A. 1, 2 and 4 only", "B. 1, 3 and 4 only", "C. 2 and 5 only", "D. 1, 2, 3, 4 and 5"],
    correctOption: "B",
    difficulty: "hard",
    explanation: "Adriatic Sea-Albania ✓, Caspian Sea-Kazakhstan ✓, Mediterranean-Morocco ✓."
  },
  {
    question: "Which of the following has/have shrunk immensely/dried up in the recent past due to human activities? 1. Aral Sea 2. Black Sea 3. Lake Baikal",
    options: ["A. 1 only", "B. 2 and 3", "C. 2 only", "D. 1 and 3"],
    correctOption: "A",
    difficulty: "easy",
    explanation: "The Aral Sea has dramatically shrunk due to water diversion for irrigation."
  },
  {
    question: "Among the following cities, which one lies on a longitude closest to that of Delhi?",
    options: ["A. Bengaluru", "B. Hyderabad", "C. Nagpur", "D. Pune"],
    correctOption: "A",
    difficulty: "medium",
    explanation: "Delhi is at ~77°E. Bengaluru is at ~77.5°E, making it the closest."
  },
  {
    question: "Mediterranean Sea is a border of which of the following countries? 1. Jordan 2. Iraq 3. Lebanon 4. Syria",
    options: ["A. 1, 2 and 3 only", "B. 2 and 3 only", "C. 3 and 4 only", "D. 1, 3 and 4 only"],
    correctOption: "C",
    difficulty: "medium",
    explanation: "Lebanon and Syria have Mediterranean coastlines."
  },
  {
    question: "If you travel by road from Kohima to Kottayam, what is the minimum number of States within India through which you can travel?",
    options: ["A. 6", "B. 7", "C. 8", "D. 9"],
    correctOption: "B",
    difficulty: "hard",
    explanation: "Nagaland → Assam → West Bengal → Odisha → Andhra Pradesh → Tamil Nadu → Kerala."
  },
  {
    question: "Consider the following statements: 1. In India, the Himalayas are spread over five States only. 2. Western Ghats are spread over five States only. 3. Pulicat Lake is spread over two States only. Which of the statements given above is/are correct?",
    options: ["A. 1 and 2 only", "B. 3 only", "C. 2 and 3 only", "D. 1 and 3 only"],
    correctOption: "B",
    difficulty: "medium",
    explanation: "Pulicat Lake is in Tamil Nadu and Andhra Pradesh."
  },
  {
    question: "Which of the following is geographically closest to Great Nicobar?",
    options: ["A. Sumatra", "B. Borneo", "C. Java", "D. Sri Lanka"],
    correctOption: "A",
    difficulty: "easy",
    explanation: "Great Nicobar is closest to Sumatra, Indonesia."
  },
  {
    question: "Which one of the following countries of South-West Asia does not open out to the Mediterranean Sea?",
    options: ["A. Syria", "B. Jordan", "C. Lebanon", "D. Israel"],
    correctOption: "B",
    difficulty: "easy",
    explanation: "Jordan is landlocked with respect to the Mediterranean Sea."
  }
];

export function getRelevantExamples(topic: string, difficulty: string, count = 5) {
  return QUESTION_BANK
    .filter(q => 
      q.difficulty === difficulty || 
      q.question.toLowerCase().includes(topic.toLowerCase())
    )
    .slice(0, count);
}
