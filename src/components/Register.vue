<template>


  <div class="container">
    Register
    <div class="form">
      <input type="text" v-model="name" placeholder="name">
      <input type="email" v-model="email" placeholder="email">
      <input type="password" v-model="password" placeholder="password">


      <div class="err">{{ error }}</div>

      <input class="submit" type="submit" value="Register" @click="registerCheck">

      <label class="toLogin">already have an account? <router-link class="link" to="/Login">login here</router-link></label>
    </div>
  </div>


</template>


<script>
import axios from 'axios'

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: ''

    }

  },
  methods: {
    registerCheck() {
      if (this.name.trim().length == 0) {
        this.error = "Name cannot be empty!"
      } else if (this.password.trim().length < 5) {
        this.error = "Password Must be at least 5 characters long"
      } else if (this.email.trim().length == 0) {
        this.error = "Email cannot be empty!"
      } else {
        this.register()
        this.$router.replace({name: "Login"});
      }
    },
    async register() {
      await axios.post('https://localhost:5001/register', {
        "name": this.name,
        "email": this.email,
        "password": this.password
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json', 'accept': 'text/plain'
        },
      })
        .catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>


<style>
* {
  margin: 0
}

html {
  margin: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  border: 1px solid gray;
  width: 100%;
  height: 100%;
  padding: 10px 10px;
  box-shadow: 5px 10px gainsboro;
  border-radius: 10px;
}

.err {
  font-size: 12px;
  color: red;
  margin: 10px 0;
}

.form {
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 300px;
  align-items: center;
  margin: 0;
}

.form > input[type=text], input[type=email], input[type=password] {
  width: 70%;
  margin: 12px 10px;
  padding: 10px 5px;
  border-radius: 10px;
}

.submit {
  width: 100px;
  height: 35px;
  border-radius: 10px;
  background-color: lightblue;
  color: saddlebrown;
}
.toLogin{
  margin-top: 10px;
  font-size: 12px;
}
.link{
  text-decoration: none;
  color: dodgerblue;
}
</style>
