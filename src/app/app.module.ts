import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizMainComponent } from './components/quiz-main/quiz-main.component';
import { ResultPageComponent } from './components/result-page/result-page.component';
import { HttpClientModule } from  '@angular/common/http';
import { QuizQuestionAnswersComponent } from './components/quiz-question-answers/quiz-question-answers.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizMainComponent,
    ResultPageComponent,
    QuizQuestionAnswersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
