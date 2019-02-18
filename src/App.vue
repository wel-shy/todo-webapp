<template lang="pug">
  div#app
    div.content
      NewTodo#new-todo
      Login(
        v-if="token.length === 0 ",
        v-on:authenticated="getData",
      )
      AllTodos#all
      Archived#archive(
        v-if="archived > 0",
      )
    FooterBar
</template>

<script>
import NewTodo from './components/NewTodo.vue';
import AllTodos from './components/AllTodos.vue';
import Cookie from './cookie';
import API from './API';
import Login from './components/Login.vue';
import Archived from './components/Archived.vue';
import FooterBar from './components/FooterBar.vue';

export default {
  name: 'app',
  components: {
    FooterBar,
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
      return this.$store.getters.getArchiveCount;
    },
  },
  methods: {
    async getData() {
      try {
        const payload = await API.getPagedTodos(
          this.$store.getters.getPage,
          this.$store.getters.getLimit,
          this.$store.getters.getToken,
        );

        this.$store.commit('updateTodos', payload.resources);
        this.$store.commit('updateCount', payload.count);

        const archive = await API.getPagedArchived(
          this.$store.getters.getArchivePage,
          this.$store.getters.getLimit,
          this.$store.getters.getToken,
        );

        this.$store.commit('updateArchived', archive.resources);
        this.$store.commit('updateArchiveCount', archive.count);
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
  .content {
    margin-bottom: 350px;
  }
  min-height: 100%;
  #all {
    margin-top: 2.5%;
    /*min-height: 50vh;*/
  }

  #new-todo {
    /*min-height: 25vh;*/
    /*max-height: 25vh;*/
  }

  #archive {
    margin-top: 2.5%;
    margin-bottom: 5%;
    /*min-height: 25vh;*/
  }
}
</style>
