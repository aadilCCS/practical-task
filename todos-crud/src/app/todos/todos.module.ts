import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { ViewDialogComponent } from './todo-list/view-dialog/view-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

const routes: Routes = [
  { path: '', component: TodoListComponent },
  { path: 'form', component: TodoFormComponent },
  { path: 'form/:id', component: TodoFormComponent },
]

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ViewDialogComponent,
    TodoListComponent,
    TodoFormComponent,
  ]
})


export class TodosModule { }
