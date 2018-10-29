<template>
  <div class="body">
    <div class="container">

      <div class="header">
        <h1>Venomgram</h1>
      </div>

      <div class="box" v-if="active === 'login'">
        <div style="display: flex; justify-content: space-around; align-items: center; text-align: center; width: 100%; border-bottom: 3px solid navy;">
          <h3 @click="active = 'login'" style="width:100%; cursor: pointer; background-color: navy; color: white; padding: 5px 0;">Login</h3>
          <h3 @click="active = 'register'" style="width:100%; cursor: pointer; padding: 5px 0;">Register</h3>
        </div>
        <div style="display: flex; flex-direction: column; justify-content: space-evenly; align-items: center; height: 100%; width: 80%;">
          <input v-model="username" placeholder="Username..." />
          <input v-model="password" placeholder="Password..." />
          <input type="button" value="Submit" @click="login()">
        </div>
      </div>

      <div class="box" v-if="active === 'register'">
        <div style="display: flex; justify-content: space-around; align-items: center; text-align: center; width: 100%; border-bottom: 3px solid navy;">
          <h3 @click="active = 'login'" style="width:100%; cursor: pointer; padding: 5px 0;">Login</h3>
          <h3 @click="active = 'register'" style="width:100%; cursor: pointer; background-color: navy; color: white; padding: 5px 0;">Register</h3>
        </div>
        <div style="display: flex; flex-direction: column; justify-content: space-evenly; align-items: center; height: 100%; width: 80%;">
          <input v-model="username" placeholder="Username..." />
          <input v-model="password" placeholder="Password..." />
          <input type="button" value="Submit" @click="register()">
        </div>
      </div>

      <div style="margin-top:10px;"><p>{{response}}</p></div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      active: 'login',
      username: '',
      password: '',
      response: '',
    };
  },
  methods: {
    login() {
      fetch('https://venomgram-server.herokuapp.com/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.username, password: this.password }),
      })
        .then(res => res.json())
        .then((data) => {
          if (data.message === 'Login successful.') {
            this.username = '';
            this.password = '';
            localStorage.setItem('username', data.username);
            localStorage.setItem('token', data.token);
            this.$store.commit('setUser');
          } else {
            this.response = data.message;
          }
        })
        .catch(err => this.response = 'Login failed.');
    },
    register() {
      fetch('https://venomgram-server.herokuapp.com/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.username, password: this.password }),
      })
        .then(res => res.json())
        .then(data => this.response = data.message)
        .catch(err => this.response = err);
    },
  },
};
</script>

<style scoped>

  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;
  }

  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    height: 200px;
    border: 5px solid navy;
  }

  input[type=button] {
    outline: none;
    border: none;
    background-color: navy;
    color: white;
    font-family: 'Montserrat', Verdana, sans-serif;
    padding: 10px 20px;
  }

</style>
