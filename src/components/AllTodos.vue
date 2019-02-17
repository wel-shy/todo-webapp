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
    /**
     * Get a slice of todos
     */
    todos() {
      return this.$store.getters.getTodos
        .slice((this.getPage - 1) * this.limit, ((this.getPage - 1) * this.limit) + this.limit);
    },
    /**
     * Get the max page number
     * @returns {number}
     */
    maxPage() {
      return Math.ceil(this.$store.getters.getTodos.length / this.limit);
    },
    /**
     * Get current page number
     * @returns {number}
     */
    getPage() {
      return this.$store.getters.getPage;
    },
    /**
     * Determine if max page
     * @returns {number}
     */
    isMaxPage() {
      return this.getPage === this.maxPage;
    },
    /**
     * Determine if min page
     * @returns {boolean}
     */
    isMinPage() {
      return this.getPage === 1;
    },
    /**
     * Get the limit of todos to show at one time
     * @returns {getters.getLimit}
     */
    limit() {
      return this.$store.getters.getLimit;
    },
    /**
     * Get the count of todos.
     * @returns {getters.getCount}
     */
    count() {
      return this.$store.getters.getCount;
    },
  },
  methods: {
    /**
     * Update to next page.
     * @param direction
     */
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
