import { Component, OnInit } from '@angular/core';
import { Todo } from './../../models/Todo';
import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL, BASE_API, BASE_AUTH, BASE_CRUD_TODO } from './../../../environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})

export class TodosComponent implements OnInit {

  todos: Todo[] = [];
  inputTodo: string = "";

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.todos = [];
    this.getAllTodos();
  }

  setDateFormat(_date: Date) {
    return formatDate(_date, 'dd/MM/yyyy', 'fr');
  }

  deleteTodo(id: number) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${this.todos[id].todo_label}" ?`)) {
      let data = {
        "token": localStorage.getItem("token"),
        "user-id": localStorage.getItem("user-id") || ""
      }
      this.httpHeaders = this.httpHeaders.set('user-id', data["user-id"].toString());

      let url = `${BASE_URL + BASE_API + BASE_CRUD_TODO}`;

      this.http.delete(`${url}/${this.todos[id].todo_id}`, { headers: this.httpHeaders }).subscribe(() => {
        console.log('Delete successful');
        alert(`La tâche a bien été supprimée. 👍`);
      });


      this.todos = this.todos.filter((v, i) => i !== id);
    }
  }

  updateTodo(id: number, todoLabel: string, todoIsDone: boolean) {
    let _data = {
      "todo_id": this.todos[id].todo_id,
      "todo_is_done": (todoIsDone ? 1 : 0),
      "todo_label": todoLabel
    };

    let data = {
      "token": localStorage.getItem("token"),
      "user-id": localStorage.getItem("user-id") || ""
    }

    this.httpHeaders = this.httpHeaders.set('user-id', data["user-id"].toString());

    let url = `${BASE_URL + BASE_API + BASE_CRUD_TODO}`;
    this.http.post(url, _data, { headers: this.httpHeaders }).subscribe(result => {
      console.log(result);
      alert(`La tâche "${todoLabel}" a bien été modifiée. 👍`);
    })
  }


  addTodo() {
    if (this.inputTodo) {
      this.todos.push({
        todo_date: new Date(),
        todo_id: 0,
        todo_is_done: 0,
        todo_label: this.inputTodo,
        todo_user_id: Number(localStorage.getItem("user-id"))
      })

      let _data = {
        "todo_is_done": 0,
        "todo_label": this.inputTodo
      };

      let data = {
        "token": localStorage.getItem("token"),
        "user-id": localStorage.getItem("user-id") || ""
      }

      this.httpHeaders = this.httpHeaders.set('user-id', data["user-id"].toString());

      let url = `${BASE_URL + BASE_API + BASE_CRUD_TODO}`;

      this.http.post(url, _data, { headers: this.httpHeaders }).subscribe(result => {
        console.log(result);
        alert(`Nouvelle tâche sauvegardée ! 👍`);
      })

      this.inputTodo = "";
    }
    else console.log("Veuillez saisir une nouvelle tâche");
  }

  getAllTodos() {
    let data = {
      "token": localStorage.getItem("token"),
      "user-id": localStorage.getItem("user-id") || ""
    }

    this.httpHeaders = this.httpHeaders.set('user-id', data["user-id"].toString());
    this.http.get<Todo[]>(`${BASE_URL + BASE_API + BASE_CRUD_TODO}/list`, { headers: this.httpHeaders }).subscribe(result => {
      this.todos = result;
    })
  }
}