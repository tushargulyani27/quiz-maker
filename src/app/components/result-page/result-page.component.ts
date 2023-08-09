import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizStateServiceService } from '../../services/quiz-state-service.service';
import { Questions } from '../../models/quiz.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {
  questions: Questions[] = [];
  selectedAnswers: { [index: number]: string } = {};
  correctAnswercount = 0;
  subscriptions = new Subscription();

  constructor(private quizStateServiceService: QuizStateServiceService, private router: Router) { }

  ngOnInit(): void {
    this.subscriptions = this.quizStateServiceService.getQuestionAnswer().subscribe(questionAnswers => {
      this.questions = questionAnswers.questions;
      this.selectedAnswers = questionAnswers.answers;
    });

    this.questions.forEach((ques, index) => {
      if (ques.correct_answer === this.selectedAnswers[index]) {
        this.correctAnswercount++;
      }
    });
  }

  ngOnDestroy(): void {
    this.quizStateServiceService.setQuestionAnswer({
      answers: [],
      questions: []
    });
    this.subscriptions.unsubscribe();
  }

  newQuiz(): void {
    this.router.navigate(['/main']);
  }

}
