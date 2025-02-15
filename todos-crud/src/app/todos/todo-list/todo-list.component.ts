import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TodoService } from './../todo.service';
import { ViewDialogComponent } from './view-dialog/view-dialog.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Todo } from '../../models/todos';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

// export interface Todo {
//   id: number;
//   title: string;
//   completed: boolean;
// }

@Component({
  selector: 'app-todo-list',
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  displayedColumns: string[] = ['id', 'title', 'description', 'completed','view', 'actions'];
  dataSource = new MatTableDataSource<Todo>();

  constructor(
    private todoService: TodoService,
    private _router: Router,
    private dialog: MatDialog
  ) { }

  // view dialog box for each todo item
  viewTodo(todo: Todo): void {
    this.dialog.open(ViewDialogComponent, {
      width: '500px',
      data: todo
    });
  }

  ngOnInit(): void {
    this.loadTodos();
  }

  // get all todos
  async loadTodos() {
    const response = await this.todoService.getTodos()
    this.dataSource.data = response;
  }

  // goto edit page
	goTo(path: string) {
		this._router.navigate([path]);
	}

  // delete todo
  async deleteTodo(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Are you sure you want to delete this todo?' }
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        await this.todoService.deleteTodo(id);
        this.loadTodos();
      }
    });
  }
}
