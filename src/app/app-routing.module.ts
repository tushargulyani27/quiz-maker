import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizMainComponent } from './components/quiz-main/quiz-main.component';
import { ResultPageComponent } from './components/result-page/result-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  { path: 'main', component: QuizMainComponent },
  { path: 'result', component: ResultPageComponent},
  { path: '**', component: QuizMainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
