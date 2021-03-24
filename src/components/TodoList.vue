<template>
  <div>
    <h1>
      Testing TodoList
    </h1>
    <input type="text" v-model="newTodo" placeholder="What need to do" class="todo-input" @keyup.enter="addTodo">
    <div v-for="(todo, index) in todos" :key="todo.id" class="todo-item">
      <div class="todo-item-left">
        <!-- <input type="checkbox" v-model="todo.completed"> -->
        <div class="todo-item-label" v-if="!todo.editing" @dblclick="editTodo(todo)">
          {{todo.title}}
        </div>
        <input type="text" class="todo-item-input" @keyup.enter="updateTodo(todo)" v-if="todo.editing" v-model="todo.title">
      </div>
      <div class="remove-item" @click="removeTodo(index)">
        &times;
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  data () {
    return {
      newTodo: '',
      idForTodo: 4,
      todos:[
        {
          'id' : 1,
          'title': 'Dinish vue Screencast',
          'completed': false,
          'editing': false,
        },
        {
          'id' : 2,
          'title': 'Wdamks vue fnsa',
          'completed': true,
          'editing': false,
        },
        {
          'id' : 3,
          'title': 'Lorem ipsum sit ament dolor',
          'completed': false,
          'editing': false,
        },
      ],
    }
  },
  methods:{
    addTodo(){
      if(this.newTodo.trim() != ''){
        this.todos.push({
          id: this.idForTodo,
          title: this.newTodo,
          completed: false,
          editing: false,
        });
        this.idForTodo = this.idForTodo + 1;
      }
      else{
        alert('No input')
      }
      this.newTodo = '';
    },
    editTodo(todo){
      todo.editing = true;
    },
    updateTodo(todo){
      todo.editing = false;
    },
    removeTodo(index){
      this.todos.splice(index, 1);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .todo-input{
    width: 70%;
    padding: 10px 20px;
    font-size: 12px;
    margin: 10px;

    &:focus{
      outline: 0;
    }
  }

  .todo-item{
    margin: 0 10px;
    display: flex;
    align-items: center;
    text-align: left;
    justify-content: space-between;
  }

  .remove-item{
    cursor: pointer;
    &:hover{
      color: black;
    }
  }

  .todo-item-left{
    display: flex;
    align-items: center;
  }

  .todo-item-label{
    padding: 10px;
    border: solid 1px white;
    margin-left: 10px;
    width: 100%;
  }

  .todo-item-input{
    font-size: 24px;
    margin-left: 10px;
    padding: 10px;
    width: 100%;
    border: solid 1px #aaa;

    &:focus{
      outline: none;
    }
  }
</style>
