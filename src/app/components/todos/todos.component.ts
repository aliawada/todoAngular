import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';
import { TodoService} from '../../services/todo.service';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos: Todo[];

  constructor(private ts:TodoService) { }

  ngOnInit() { 
    this.ts.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  deleteTodo(todo:Todo) {
    //filter all todos without the specific id to remove from UI
    this.todos = this.todos.filter(t => t.id !== todo.id);
    //delete from the server
    this.ts.deleteTodo(todo).subscribe();
  }

  addTodo(todo: Todo) {
    this.ts.addTodo(todo).subscribe( todo => {
      this.todos.push(todo);
    })
  }

}
