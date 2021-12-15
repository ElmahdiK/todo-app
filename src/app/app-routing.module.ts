import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { LoginComponent } from './components/login/login.component';
import { TodosComponent } from './components/todos/todos.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'todos', component: TodosComponent, canActivate: [IsAuthenticatedGuard]
  },
  {
    path: '**', component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, TodosComponent];