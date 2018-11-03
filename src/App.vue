<template>

  <div id="app">

    <div v-if="username === undefined">
      <Login />
    </div>

    <div v-if="username !== undefined">
      <div class="header">
        <h1>Venomgram</h1>
      </div>
      <router-view/>
      <div id="nav">
        <router-link to="/"><i class="fas fa-home fa-2x"></i></router-link>
        <router-link to="/explore"><i class="fas fa-search fa-2x"></i></router-link>
        <router-link to="/upload"><i class="fas fa-camera fa-2x"></i></router-link>
        <router-link to="/profile"><i class="fas fa-user-alt fa-2x"></i></router-link>
      </div>
    </div>

  </div>

</template>

<script>

import Login from '@/components/Login.vue';

export default {
  components: {
    Login,
  },
  mounted() {
    fetch(`https://venomgram-server.herokuapp.com/user/self`, {
      headers: { Authorization: `Bearer ${this.token}` },
    })
      .then(res => res.json())
      .then((data) => {
        if(data === 'Authentication Failed.') {
          localStorage.clear();
          this.$store.commit('setUser');
        }
      })
      .catch(err => console.log(err));
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
    token() {
      return this.$store.state.token;
    },
  },
};

</script>

<style>

* { box-sizing: border-box; word-break: break-word; }
body { margin: 0; color: #666; }
h1 { font-family: 'Dancing Script'; font-size: 2.2em; color: navy; margin: 0; }
h2, h3, h4, h5, h6, p { font-family: 'Montserrat', Verdana, sans-serif; margin: 0; line-height: 1.5; }

.header {
  background-color: white;
  height: 10vh;
  width: 100vw;
  border-bottom: 5px solid navy;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
}

#nav {
  background-color: white;
  height: 10vh;
  width: 100vw;
  border-top: 5px solid navy;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
}

#nav a { color: navy; }
#nav a.router-link-exact-active { color: lightgreen; }

.body { margin-top: 10vh; margin-bottom: 10vh; padding-top:10px; }

.card {
  display: flex; 
  flex-direction: column; 
  justify-content: center; 
  margin-bottom: 50px; 
  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2); 
  width: 300px;
}

.picture {
  width: 300px; 
  max-height: 300px; 
  object-fit: cover;
}

@media only screen and (max-width: 500px) {
    .card, .picture {
        width: 100%;
    }
    .body {
      padding-top: 0;
    }
}

</style>
