<template lang="pug">
  div#archived.container
    h2.is-size-3.has-text-centered 🗃 Archive
    ArchivedTodo(
      v-for="todo in todos",
      :todo="todo"
    )
</template>

<script>
import ArchivedTodo from './ArchivedTodo.vue';

export default {
  name: 'Archived',
  components: { ArchivedTodo },
  computed: {
    todos() {
      return this.$store.getters.getArchived;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
