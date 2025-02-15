import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { ApiUrls } from '../config';


export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) { }

  // api for get all todos
  getTodos(): Promise<any> {
    return lastValueFrom(this.http.get<Todo>(ApiUrls.TODOS));
  }

  // api for add todo
  addTodo(todo: Todo): Promise<any> {
    return lastValueFrom(this.http.post<Todo>(ApiUrls.TODOS, todo));
  }

  // api for get single todo
  getTodoById(id: string): Promise<any> {
    return lastValueFrom(this.http.get<Todo>(`${ApiUrls.TODOS}/${id}`));
  }

  // api for update todo
  updateTodo(id:string , todo: Todo): Promise<any> {
    return lastValueFrom(this.http.put<Todo>(`${ApiUrls.TODOS}/${id}`, todo));
  }

  // api for delete todo
  deleteTodo(id: number): Promise<any> {
    return lastValueFrom(this.http.delete<Todo>(`${ApiUrls.TODOS}/${id}`));
  }
}
