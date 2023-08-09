import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoriesResp, QuizResponse } from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {
  private baseUrl = 'https://opentdb.com';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<CategoriesResp> {
    return this.http.get<CategoriesResp>(`${this.baseUrl}/api_category.php`);
  }

  getQuestions(category: number, difficultyLevel: string): Observable<QuizResponse> {
    return this.http.get<QuizResponse>(`${this.baseUrl}/api.php?amount=5&category=${category}&difficulty=${difficultyLevel}&type=multiple`).pipe(
      map(ques => ({
        ...ques,
        results: ques.results.map(q => {
          return {
            ...q,
            options: [q.correct_answer, ...q.incorrect_answers].sort(() => Math.random() - 0.5)
          }
        })
      })
      )
    )
  }
}
