<template lang="pug">
    div#new-todo.has-text-centered
      section.hero.is-small.is-small
        div.hero-body
          div.hero-head.has-text-right(
            v-if="token"
          )
            button.button(
              @click="logout"
            ) Logout
          div.container
            h1.is-size-1 Todos
            div.field.has-addons.has-addons-centered
              div.control.text-input
                input.input(
                  type="text",
                  placeholder="New todo!",
                  v-model="task",
                  v-on:keyup.enter="addTodo"
                )
              div.control
                a#submit-todo.button.is-primary.is-outlined(
                  :disabled="task.length < 1"
                  @click="addTodo"
                )
                  span.icon.is-small
                    i.fas.fa-plus
            SearchBar(
              v-on:search-todos="handleSearch"
            )
</template>

<script>
import Login from './Login.vue';
import API from '../API';
import SearchBar from './SearchBar.vue';
import Cookie from '../cookie';

export default {
  name: 'NewTodo',
  components: { SearchBar, Login },
  data() {
    return {
      task: '',
    };
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
  },
  methods: {
    async addTodo() {
      if (this.task === '') throw new Error('task cannot be empty');

      const todoData = {
        task: this.task,
        done: false,
        archived: false,
      };

      if (this.$store.getters.getToken.length > 0) {
        let todo;
        try {
          todo = await API.storeTodo(todoData, this.$store.getters.getToken);
          this.$store.commit('addTodo', todo);
          this.$store.commit('incrementCount');
        } catch (e) {
          console.error(e);
        }
      } else {
        todoData._id = Math.floor((Math.random() * 10000) + 1);
        this.$store.commit('addTodo', todoData);
        this.$store.commit('incrementCount');
      }

      this.task = '';
    },
    handleSearch(e) {
      console.log(e);
      this.$emit('search-todos', e);
    },
    logout() {
      Cookie.delete();
      this.$store.commit('deleteToken');
      this.$store.commit('resetTodos');
    },
  },
};
</script>

<style lang="scss" scoped>
  #new-todo {
    /*margin-bottom: 2.5%;*/
  }

.text-input {
  width: 50%;
}
</style>
