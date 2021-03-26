<template>
  <div>
    <h1>
      Testing TodoList
    </h1>
    <input type="text" v-model="newTodo" placeholder="What need to do" class="todo-input" @keyup.enter="addTodo">

    <div v-for="(todo, index) in filteredTodo" :key="todo.id" class="todo-item">
      <div class="todo-item-left">
        <input type="checkbox" v-model="todo.completed">
        <div class="todo-item-label" :class="{completed : todo.completed}" @dblclick="editTodo(todo)" v-if="!todo.editing">
          {{todo.title}}
        </div>
        <input type="text" class="todo-item-input" @keyup.enter="updateTodo(todo)" @keyup.esc="cancleUpdate(todo)" @blur="updateTodo(todo)" v-if="todo.editing" v-model="todo.title" v-focus>
      </div>
      <div class="remove-item" @click="removeTodo(index)">
        &times;
      </div>
    </div>

    <div class="extra-panel">
      <div>
        <label>
          <input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos">
          Check All
        </label>
      </div>
      <div>
        {{ remaining }} todo(s) left
      </div>
    </div>

    <div class="extra-panel">
      <div>
        <button :class="{ active: filter == 'all' }" @click="filter = 'all'">
          All
        </button>
        <button :class="{ active: filter == 'active' }" @click="filter = 'active'">
          Active
        </button>
        <button :class="{ active: filter == 'complete' }" @click="filter = 'complete'">
          Completed
        </button>
      </div>
      <div>
        <button v-if="showClearComplete" @click="deleteComplete">
          Delete Completed
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'TodoList',
  data () {
    return {
      newTodo: '',
      idForTodo: 4,
      beforeEditCache: '',
      filter: 'all',
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
  directives:{
    focus:{
      inserted: function(el) {
        el.focus();
      }
    }
  },
  computed:{
    anyRemaining(){
      if(this.todos.length == 0)
        return true;
      return this.remaining != 0;
    },
    remaining(){
      return this.todos.filter(todo => !todo.completed).length;
    },
    filteredTodo(){
      if(this.filter == 'all'){
        return this.todos;
      }
      else if(this.filter == 'active'){
        return this.todos.filter(todo => !todo.completed);
      }
      else if(this.filter == 'complete'){
        return this.todos.filter(todo => todo.completed);
      }
      return this.todos;
    },
    showClearComplete(){
      return this.todos.filter(todo => todo.completed).length != 0;
    }
  },
  mounted:function(){
    this.loadTodo();
  },
  methods:{
    async loadTodo(){
      await axios.get('https://localhost:5001/api/todo', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'accept' : 'text/plain'
          },
        })
        .then(response => this.todos = response.data)
        .catch( (err) => {
          console.log(err)
        })
    },
    addTodo(){
      if(this.newTodo.trim().length != 0){
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
      this.beforeEditCache = todo.title;
      todo.editing = true;
    },
    updateTodo(todo){
      if(todo.title.trim() == ''){
        todo.title = this.beforeEditCache;
      }
      todo.editing = false;
    },
    cancleUpdate(todo){
      todo.title = this.beforeEditCache;
      todo.editing = false;
    },
    removeTodo(index){
      this.todos.splice(index, 1);
    },
    checkAllTodos(){
      this.todos.forEach(todo => todo.completed = event.target.checked) ;
    },
    deleteComplete(){
      this.todos = this.todos.filter(todo => !todo.completed);
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
  }

  .todo-input:focus{
    outline: 0;
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
  }

  .remove-item:hover{
    color: black;
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
  }

  .todo-item-input:focus{
    outline: none;
  }

  .completed{
    text-decoration: line-through;
    color: #aaa;
  }

  .extra-panel{
    border-top: solid 1px black;
    display: flex;
    justify-content: space-between;
    margin: 5px;
    padding: 5px;
  }

  .active{
    background-color: darkblue;
    color: white;
  }
</style>
