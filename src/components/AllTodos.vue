<template lang="pug">
  div#all-todos
    Todo(
      v-for="todo in todos",
      :todo="todo"
    )
</template>

<script>
import Todo from './Todo.vue';

export default {
  name: 'AllTodos',
  components: { Todo },
  computed: {
    todos() {
      return this.$store.getters.getTodos;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
