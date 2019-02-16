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
</template>

<script>
export default {
  name: 'NewTodo',
  data() {
    return {
      task: '',
    };
  },
  methods: {
    addTodo() {
      const todo = {
        task: this.task,
        done: true,
        _id: Math.floor((Math.random() * 100) + 1),
      };

      this.$store.commit('addTodo', todo);
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
