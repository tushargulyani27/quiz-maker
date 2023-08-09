export interface DifficultyLevels {
  label: string;
  value: string;
}

export interface CategoriesResp {
  trivia_categories: Categories[]
}

export interface Categories {
  id: number,
  name: string
}

export interface QuizResponse {
  response_code: boolean;
  results: Questions[];
}

export interface Questions {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
  options?: string[];
}

export interface QuestionAnswerState {
  answers: string[]
  questions: Questions[]
}
