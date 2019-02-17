<template lang="pug">
  div#all-todos.container
    div.todos
      Todo(
        v-for="todo in todos",
        :todo="todo"
      )
    div.page-selection.has.text.has-text-centered(
      v-if="count > limit "
    )
      div.columns.is-mobile
        div.column.has-text-right
          p(
            v-if="!isMinPage",
            @click="updatePage(-1)"
          ) <
        div.column.is-narrow
          P Page {{ getPage }} of&nbsp;
            span(
              v-html="maxPage"
            )
        div.column.has-text-left
          p(
            v-if="!isMaxPage",
            @click="updatePage(1)"
          ) >

</template>

<script>
import Todo from './Todo.vue';

export default {
  name: 'AllTodos',
  components: { Todo },
  computed: {
    todos() {
      return this.$store.getters.getTodos
        .slice((this.getPage - 1) * this.limit, ((this.getPage - 1) * this.limit) + this.limit);
    },
    maxPage() {
      return Math.ceil(this.$store.getters.getTodos.length / this.limit);
    },
    getPage() {
      return this.$store.getters.getPage;
    },
    isMaxPage() {
      return this.getPage === this.maxPage;
    },
    isMinPage() {
      return this.getPage === 1;
    },
    limit() {
      return this.$store.getters.getLimit;
    },
    count() {
      return this.$store.getters.getCount;
    },
  },
  methods: {
    updatePage(direction) {
      if (direction > 0) {
        this.$store.commit('incrementPage');
      } else {
        this.$store.commit('decrementPage');
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
