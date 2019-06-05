import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private ts:TodoService) { }

  ngOnInit() {
  }

  setClasses(){
    let classes = {
      todo: true,
      'is-completed': this.todo.completed
    }

    return classes;
  }

  onToggle(todo){
    todo.completed = !todo.completed;
    // put
    this.ts.toggleCompleted(todo).subscribe(todo => {
      console.log(todo);
    })

  }

  onDelete(todo){
    //delete (pass the todo to the top layer)
    this.deleteTodo.emit(todo);
  }

}
