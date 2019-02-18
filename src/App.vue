<template lang="pug">
  div#app
    div.content
      NewTodo#new-todo(
        v-on:search-todos="searchTodos"
      )
      Login(
        v-if="token.length === 0 ",
        v-on:authenticated="getData",
      )
      Search#search(
        v-if="searchResults.length > 0"
        :todos="searchResults",
        :query="query",
        v-on:clear-search="searchResults = []"
      )
      AllTodos#all(
        v-if="hasTodos"
      )
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
import Search from './components/Search.vue';

export default {
  name: 'app',
  components: {
    Search,
    FooterBar,
    Archived,
    Login,
    AllTodos,
    NewTodo,
  },
  data() {
    return {
      searchResults: [],
      query: '',
    };
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
    archived() {
      return this.$store.getters.getArchiveCount;
    },
    hasTodos() {
      return this.$store.getters.getCount > 0;
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
    async searchTodos(query) {
      this.query = query;

      if (!this.$store.getters.getToken) {
        this.searchResults = this.$store.getters.getTodos
          .filter(todo => todo.task.indexOf(query) > -1);
        return;
      }

      try {
        this.searchResults = await API.search(this.query, this.$store.getters.getToken);
      } catch (e) {
        console.log(e);
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
  }

  #archive {
    margin-top: 2.5%;
    margin-bottom: 5%;
  }

  #search {
    margin-top: 2.5%;
  }
}
</style>
