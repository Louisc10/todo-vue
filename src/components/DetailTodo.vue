<template>
  <div>
    <fieldset>
      <legend>
        <h1 v-if="!editingTitle" class="input-title" @click="editTitle()">{{todo.title}}</h1>
        <input type="text" class="input-title" @keyup.enter="cancleEditTitle()" @keyup.esc="cancleEditTitle()" @blur="cancleEditTitle()" v-model="todo.title" v-if="editingTitle" v-focus>
      </legend>
      <div>
        <p v-if="!editingContent" @click="editContent()">{{todo.content}}</p>
        <textarea class="input-content" rows="10" cols="50" @keyup.enter="cancleEditContent()" @keyup.esc="cancleEditContent()" @blur="cancleEditContent()" v-model="todo.content" v-if="editingContent" v-focus/>
      </div>

      <input type="checkbox" v-model="todo.completed" name="complete" id="complete">
      <label for="complete">Completed</label>

      <div>
        Owner: {{ owner.name }} ( {{ owner.email }} )
      </div>
    </fieldset>

    <input type="button" value="Update">

    <fieldset>
      <legend>
        Access User
      </legend>
      <div v-for="user in users" :key="user.id" >
        {{ user.email }}
      </div>
    </fieldset>
    <div>
        <div>
          <input type="text" v-model="tempUser" class="input-content">
        </div>
        <input type="button" value="Add" @click="addAccess">
    </div>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  name: 'DetailTodo',
  data () {
    return {
      tempData: '',
      tempUser: '',
      editingTitle: false,
      editingContent: false,
      owner: {},
      users: [],
      todo:{
        'id' : 1,
        'title': 'Dinish vue Screencast',
        'content': 'Shiera sit amet dolor',
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
    this.loadData();
  },
  methods:{
    async loadData(){
      await axios.get('https://localhost:5001/api/todo/'+this.$route.params.id, {
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
      this.todo = response.data.todo
      this.owner = response.data.userOwner
      this.users = response.data.userAllowed
    },
    async getUserByEmail(){
      await axios.get('https://localhost:5001/api/user/'+this.tempUser, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'accept' : 'text/plain'
          },
        })
        .then(response => this.addAccess(response))
        .catch( (err) => {
          console.log(err)
        })
    },
    addAccess(response){
      alert(response.data)
      if (response.data != null){
        var temp = {
          email: this.tempUser
        }
        this.users.push(temp)
      }
      this.tempUser = ''
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
    margin: 0 10px;
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
