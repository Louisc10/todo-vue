<template>
  <div>

    <div >
      <div class="bor">
        <input type="text" v-model="name" placeholder="name">
        <input type="email" v-model="email" placeholder="email">
        <input type="password" v-model="password" placeholder="password">


        <div>{{error}}</div>

        <input type="submit" @click="registerCheck">
      </div>
    </div>

  </div>
</template>




<script>
export default{
  name: 'Register',
  data(){
    return{
      name : '',
      email : '',
      password : '',
      error: ''

    }

  },
  methods:{
    registerCheck(){
      if(this.name.trim().length == 0){
        this.error="Name cannot be empty!"
      }
      else if(this.password.trim().length < 5){
        this.error = "Password Must be at least 5 characters long"
      }
      else if(this.email.trim().length == 0){
        this.error = "Email cannot be empty!"
      }
      else{
        this.$router.replace({ name: "ToDo" });
      }
    }
  }
}
</script>


<style>
  .bor{
    border: 1px solid red;
    display: flex;
    flex-direction: column;
  }
</style>
