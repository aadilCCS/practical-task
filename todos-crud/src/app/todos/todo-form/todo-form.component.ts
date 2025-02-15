import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo, TodoService } from '../todo.service';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-form',
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  todoForm: FormGroup;
  currentItemId: string | null = null;
  currentItem: Todo | any = null;

  constructor(
    private fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private snackBar: MatSnackBar,
    private _todoService: TodoService
  ) {
    this.todoForm = this.fb.group({
      title: [''],
      description: [''],
      isCompleted: [false]
    });
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      this.currentItemId = params.get("id");
      this.loadPreData();
    });
  }

  // preload data for edit
  async loadPreData() {
    try {
      if (this.currentItemId) {
        this.currentItem = await this._todoService.getTodoById(
          this.currentItemId
        );
        this.todoForm.patchValue({
          title: this.currentItem.title,
          description: this.currentItem.description,
          isCompleted: this.currentItem.isCompleted,
        });
      }
    } catch (error: any) {
      this.snackBar.open(error, 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }

  // back to list
  backToList(): void {
    this._router.navigate(["/todos"],);
  }

  // add or update todo
  async onSubmit() {
    if (this.todoForm.valid) {
      try {
        if (this.currentItemId) {
          await this._todoService.updateTodo(this.currentItemId, this.todoForm.value);
        } else {
          await this._todoService.addTodo(this.todoForm.value);
        }
        this._router.navigate(['/todos']);
      } catch (error: any) {
        this.snackBar.open(error?.error?.error, 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    }
  }

}
