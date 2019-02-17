<template lang="pug">
  div#app
    NewTodo
    Login(
      v-if="token.length === 0 ",
      v-on:authenticated="getData",
    )
    AllTodos#all
    Archived#archive(
      v-if="archived.length > 0",
    )
</template>

<script>
import NewTodo from './components/NewTodo.vue';
import AllTodos from './components/AllTodos.vue';
import Cookie from './cookie';
import API from './API';
import Login from './components/Login.vue';
import Archived from './components/Archived.vue';

export default {
  name: 'app',
  components: {
    Archived,
    Login,
    AllTodos,
    NewTodo,
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
    archived() {
      return this.$store.getters.getArchived;
    },
  },
  methods: {
    async getData() {
      try {
        const todos = await API.getAllTodos(this.$store.getters.getToken);
        this.$store.commit('updateTodos', todos);
        this.$store.commit('updateCount', todos.length);
      } catch (e) {
        console.log(e);
        // TODO: Update UI
      }
    },
  },
  async mounted() {
    // Get the token from cookie if exists and write to store.
    const token = Cookie.get('authToken');
    if (token) {
      this.$store.commit('updateToken', token);

      await this.getData();
    }
  },
};
</script>

<style lang="scss">
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/

  #all {
    margin-top: 2.5%;
  }

  #archive {
    margin-top: 2.5%;
  }
}
</style>
