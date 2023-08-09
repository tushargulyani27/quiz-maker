import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Questions } from 'src/app/models/quiz.model';

@Component({
  selector: 'app-quiz-question-answers',
  templateUrl: './quiz-question-answers.component.html',
  styleUrls: ['./quiz-question-answers.component.css']
})
export class QuizQuestionAnswersComponent {
  @Input() questions: Questions[] = [];
  @Input() answersFormArray?: FormArray;
  @Input() selectedAnswers: { [index: number]: string } = {};
  @Input() isResultPage: boolean = false;
  constructor(public fb: FormBuilder) { }

  optionClick(index: number, optionSelected: string): void {
    const quesControl = this.answersFormArray?.get(String(index)) as FormControl;
    if (quesControl?.value === optionSelected) {
      quesControl.setValue(null);
    } else {
      quesControl.setValue(optionSelected);
    }
  }
}
