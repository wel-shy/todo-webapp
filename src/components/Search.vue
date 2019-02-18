<template lang="pug">
    div#search.container
      div.has-text-centered
        h1.is-size-3.has-text-centered 🔎 Search
        p
        | Showing results for&nbsp;
        b {{query}}
        | &nbsp;&nbsp;&nbsp;
        a.clear-button(
          @click="$emit('clear-search')"
        ) Close
      div.todos

        Todo(
          v-for="todo in todos",
          :todo="todo",
        )
</template>

<script>
import Todo from './Todo.vue';

export default {
  components: { Todo },
  props: ['todos', 'query'],
  name: 'Search',
};
</script>

<style lang="scss" scoped>
  .clear-button {
    margin-bottom: 1.25%;
  }
</style>
