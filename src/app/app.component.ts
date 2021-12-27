import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode: String = 'list';
  public todos : Todo[]=[];
  public title : String = 'Lista de Tarefas da Duda';
 public form : FormGroup;
  
/**
 Construtor da pagina 
 */
constructor(private fb: FormBuilder) {
    
  this.form  = this.fb.group({
      title:['',Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });
    this.load();
    //this.todos.push(new Todo(1,'Passear com o cachorro',false));
    //this.todos.push(new Todo(2,'Ir ao supermercado',false));
    ///this.todos.push(new Todo(3,'cortar o cabelo',true));
   
}
clear(){
  this.form.reset();
}
add(){
 
  const title  = this.form.controls['title'].value;
  const id  = this.todos.length + 1;
  console.log(new Todo(id,title,false));
  this.todos.push(new Todo(id,title,false));
  this.save();
  this.clear();
}
remove(todo : Todo)  {
    const index  = this.todos.indexOf(todo);
    alert(index);
    if (index !== -1)
    {

        this.todos.splice(index,1);
        this.save();
    }
}

markAsDone(todo: Todo){
  todo.done = true;
  this.save();
}

MarkAsUndone(todo: Todo){
  todo.done = false
  this.save();
}

save(){
  const data  = JSON.stringify(this.todos);
  localStorage.setItem('todos',data);
  this.mode='list';
}
load(){
  const dados  = localStorage.getItem('todos');
  if(dados !== null)
  {
    this.todos   =  JSON.parse(localStorage.getItem('todos') || '{}');   
  }
 
 }
 changeMode(mode:String){
   this.mode=mode;
 }
}
