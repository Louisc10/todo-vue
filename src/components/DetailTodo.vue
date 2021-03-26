<template>
  <div>
    <fieldset>
      <legend>
        <h1 v-if="!editingTitle" @click="editTitle()">{{todo.title}}</h1>
        <input type="text" class="input-title" @keyup.enter="cancleEditTitle()" @keyup.esc="cancleEditTitle()" @blur="cancleEditTitle()" v-model="todo.title" v-if="editingTitle" v-focus>
      </legend>
      <div>
        <p v-if="!editingContent" @click="editContent()">{{todo.content}}</p>
        <textarea class="input-content" rows="10" cols="50" @keyup.enter="cancleEditContent()" @keyup.esc="cancleEditContent()" @blur="cancleEditContent()" v-model="todo.content" v-if="editingContent" v-focus/>
      </div>

      <input type="checkbox" v-model="todo.completed" name="complete" id="complete">
      <label for="complete">Completed</label>
    </fieldset>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  name: 'DetailTodo',
  data () {
    return {
      tempData: '',
      editingTitle: false,
      editingContent: false,
      todo:{
        'id' : 1,
        'title': 'Dinish vue Screencast',
        'completed': false,
      }
    }
  },
  directives:{
    focus:{
      inserted: function(el) {
        el.focus();
      }
    }
  },
  mounted:function(){
    this.loadTodo();
  },
  methods:{
    async loadTodo(){
      await axios.get('https://localhost:5001/api/todo/TO001', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'accept' : 'text/plain'
          },
        })
        .then(response => this.todof(response))
        .catch( (err) => {
          console.log(err)
        })
    },
    todof(response){
      console.log("Test")
      console.log(response.data)
      this.todo = response.data
    },
    editTitle(){
      this.tempData = this.todo.title
      this.editingTitle = true
    },
    cancleEditTitle(){
      if(this.todo.title.trim() == ''){
        this.todo.title = this.tempData;
      }
      this.editingTitle = false
    },
    editContent(){
      this.tempData = this.todo.title
      this.editingContent = true
    },
    cancleEditContent(){
      if(this.todo.content.trim() == ''){
        this.todo.content = this.tempData;
      }
      this.editingContent = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .input-title{
    display: block;
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    text-align: center;
  }

  .input-title:focus{
    outline: 0;
  }

  .input-content{
    text-align: center;
    font-size: 24px;
    color: #2c3e50;
    /* display: block; */
    margin-block-start: 1em;
    margin-block-end: 1em;
    /* margin-inline-start: 0px;
    margin-inline-end: 0px; */
  }

  .input-content:focus{
    outline: 0;
  }

</style>
