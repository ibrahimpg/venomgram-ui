<template>
  <div>
    <Settings />
    <div class="body">
      <div class="container">
        <div v-for="post in posts" :key="post.id" style="display: flex; flex-wrap: wrap; justify-content: center; margin-bottom: 50px;">
          <div>
            <div style="display: flex; background-color: navy; justify-content: space-between; padding: 10px;">
              <div>
                <i v-if="post.likedBy.includes(username)" @click="interact('post/unlike', post._id, null, 'PATCH')" class="fas fa-heart"></i>
                <i v-else @click="interact('post/like', post._id, null, 'PATCH')" class="far fa-heart"></i>
                <p style="color: white; display: inline; margin-left: 10px;">{{post.likedBy.length}}</p>
              </div>
              <div>
                <i @click="interact('post/delete', post._id, null, 'DELETE')" class="fas fa-trash"></i>
              </div>
            </div>
            <img v-bind:src="post.path" alt="user post" width=300 height=300 />
          </div>
          <div style="padding: 0 5px 0 5px;">
            <p style="width:300px;"><b>{{post.username}} </b>{{post.caption}}</p>
          </div>
        </div>
        <button v-if="posts.length >= 5" @click="loadMore()">Load More</button>
      </div>
    </div>
  </div>
</template>

<script>

import Settings from '@/components/Settings.vue';

export default {
  name: 'Profile',
  components: {
    Settings,
  },
  data() {
    return {
      posts: [],
      from: 0,
      to: 5,
    };
  },
  mounted() {
    fetch(`https://venomgram-server-test.herokuapp.com/post/profile-view/${this.username}/${this.from}/${this.to}`)
      .then(res => res.json())
      .then((data) => {
        this.posts = data;
      })
      .catch(err => console.log(err));
  },
  methods: {
    loadMore() {
      this.from += 5;
      this.to += 5;
      fetch(`https://venomgram-server-test.herokuapp.com/post/profile-view/${this.username}/${this.from}/${this.to}`)
        .then(res => res.json())
        .then((data) => {
          this.posts.push(...data);
        })
        .catch(err => console.log(err));
    },
    interact(action, postId, username, method) {
      fetch(`https://venomgram-server-test.herokuapp.com/${action}`, {
        method,
        headers: { Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: postId, username }),
      })
        .then(res => res.json())
        .then((data) => {
          fetch(`https://venomgram-server-test.herokuapp.com/post/profile-view/${this.username}/0/${this.to}`)
            .then(res => res.json())
            .then((data) => { this.posts = data; });
        })
        .catch(err => console.log(err));
    },
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

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

button {
  outline: none;
  border: none;
  background-color: navy;
  color: white;
  font-family: 'Montserrat', Verdana, sans-serif;
  padding: 10px 20px;
}

i {
  color: white;
  padding: 0px 5px;
  cursor: pointer;
}

</style>
