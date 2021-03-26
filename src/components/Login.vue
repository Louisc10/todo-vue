<template>


  <div class="container">
    Login
    <div class = "form">
      <input type="email" v-model="email" placeholder="email">
      <input type="password" v-model="password" placeholder="password">


      <div class="err">{{error}}</div>
      {{data}}
      <input class="submit" type="submit" value="Login" @click="loginCheck">
      <label class="toLogin">haven't made an account? <router-link class="link" to="/Register">Register here</router-link></label>
    </div>
  </div>


</template>


<script>
import axios from 'axios'
export default{
  name: 'Login',
  data(){
    return{
      email : '',
      password : '',
      error: '',
      data: null

    }

  },
  methods:{
    async loginCheck(){
       await axios.post('https://localhost:5001/login',{
         "email" : this.email,
         "password" : this.password
      }, {
         headers: {'Access-Control-Allow-Origin': '*',
           'Content-Type': 'application/json', 'accept' : 'text/plain'},
      })
          .then(response => this.login(response.data))
          .catch( (err) => {
            console.log(err)
          })
    },
    login(data){
      console.log(data)
      if (data !== ""){
        this.$router.replace("ToDo")
      }
      else{
        this.error = "Wrong Email or Password"
      }
    }
  }
}
</script>


<style>
*{
  margin:0
}
html{
  margin: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.container{
  border: 1px solid gray;
  width: 100%;
  height: 100%;
  padding: 10px 10px;
  box-shadow: 5px 10px gainsboro;
  border-radius: 10px;
}
.err{
  font-size: 12px;
  color:red;
  margin: 10px 0;
}
.form{
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 300px;
  align-items: center;
  margin: 0;
}
.form > input[type=text],input[type=email],input[type=password]{
  width: 70%;
  margin: 12px 10px;
  padding: 10px 5px;
  border-radius: 10px;
}
.submit{
  width: 100px;
  height: 35px;
  border-radius: 10px;
  background-color: lightblue;
  color: saddlebrown;
}
.toRegister{
  margin-top: 10px;
  font-size: 12px;
}
.link{
  text-decoration: none;
  color: dodgerblue;
}
</style>
