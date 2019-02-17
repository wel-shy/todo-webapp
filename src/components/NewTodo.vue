<template lang="pug">
    div#new-todo.has-text-centered
      section.hero.is-small.is-small
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
                a#submit-todo.button.is-primary.is-outlined(
                  :disabled="task.length < 1"
                  @click="addTodo"
                )
                  span.icon.is-small
                    i.fas.fa-plus
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
