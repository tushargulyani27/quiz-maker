import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { QuizServiceService } from '../../services/quiz-service.service';
import { Categories, DifficultyLevels, Questions } from '../../models/quiz.model';
import { Router } from '@angular/router';
import { QuizStateServiceService } from '../../services/quiz-state-service.service';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quiz-main',
  templateUrl: './quiz-main.component.html',
  styleUrls: ['./quiz-main.component.css']
})
export class QuizMainComponent implements OnInit {
  quizForm = this.fb.group({
    category: ['', Validators.required],
    difficulyLevel: ['', Validators.required]
  });
  answersFormArray = this.fb.array([], Validators.required);
  questions: Questions[] = [];
  categories: Categories[] = [];
  difficultyLevels: DifficultyLevels[] = [{ label: 'Easy', value: 'easy' }, { label: 'medium', value: 'medium' }, { label: 'hard', value: 'hard' }];
  loader = false;
  subscriptions = new Subscription();

  constructor(public fb: FormBuilder, private quizServiceService: QuizServiceService, private router: Router,
    private quizStateServiceService: QuizStateServiceService) { }

  ngOnInit(): void {
    this.subscriptions = this.quizServiceService.getCategories().subscribe(categroies => {
      this.categories = categroies.trivia_categories
    });
  }

  onSubmit(): void {
    if (this.quizForm.invalid) {
      return;
    } else {
      this.loader = true;
      this.subscriptions = this.quizServiceService.getQuestions(this.quizForm.value.category, this.quizForm.value.difficulyLevel)
        .pipe(finalize(() => this.loader = false))
        .subscribe(questions => {
        this.questions = questions.results;
        this.answersFormArray.clear();
        this.questions.forEach(() => this.addFormControlAnswerArray());
      });
    }
  }

  addFormControlAnswerArray(): void {
    this.answersFormArray.push(this.fb.control(null, Validators.required));
  }

  submitQuiz(): void {
    this.quizStateServiceService.setQuestionAnswer({
      answers: this.answersFormArray.value,
      questions: this.questions
    });
    this.router.navigate(['/result']);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
