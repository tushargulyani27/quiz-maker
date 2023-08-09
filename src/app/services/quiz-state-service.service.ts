import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { QuestionAnswerState } from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizStateServiceService {
  private questionsAnswers = new BehaviorSubject<QuestionAnswerState>({answers: [], questions: []});

  constructor() { }

  getQuestionAnswer(): Observable<QuestionAnswerState> {
    return this.questionsAnswers.asObservable();
  }

  setQuestionAnswer(questionsAnswers: QuestionAnswerState): void {
    this.questionsAnswers.next(questionsAnswers);
  }

}
