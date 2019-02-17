<template lang="pug">
    div#new-todo.has-text-centered
      section.hero.is-small.is-medium
        div.hero-body
          div.container
            h1.is-size-1 📋 Todos
            div.field.has-addons.has-addons-centered
              div.control.text-input
                input.input(
                  type="text",
                  placeholder="New todo!",
                  v-model="task",
                  v-on:keyup.enter="addTodo"
                )
              div.control
                a.button.is-primary(
                  @click="addTodo"
                )
                  span.icon.is-small
                    i.fas.fa-plus
          div.hero-footer
            Login(
              v-if="!token"
            )
</template>

<script>
import Login from './Login.vue';
import API from '../API';

export default {
  name: 'NewTodo',
  components: { Login },
  data() {
    return {
      task: '',
    };
  },
  methods: {
    async addTodo() {
      const todoData = {
        task: this.task,
        done: false,
      };

      if (this.$store.getters.getToken.length > 0) {
        let todo;
        try {
          todo = await API.storeTodo(todoData, this.$store.getters.getToken);
          this.$store.commit('addTodo', todo);
        } catch (e) {
          console.error(e);
        }
      } else {
        todoData._id = Math.floor((Math.random() * 10000) + 1);
        this.$store.commit('addTodo', todoData);
      }
    },
  },
  computed: {
    token() {
      return this.$store.getters.getToken.length > 0;
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
