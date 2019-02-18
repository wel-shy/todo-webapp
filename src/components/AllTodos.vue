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
import API from '../API';

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
      return Math.ceil(this.count / this.limit);
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
        this.fetchNextPage();
      } else {
        this.$store.commit('decrementPage');
      }
    },
    async fetchNextPage() {
      if (!this.hasNextPage()) {
        try {
          const payload = await API.getPagedTodos(
            this.getPage + 1,
            this.limit,
            this.$store.getters.getToken,
          );

          console.log(payload);

          this.$store.commit('appendTodos', payload.resources);
          this.$store.commit('updateCount', payload.count);
          this.$store.commit('incrementPage');
        } catch (e) {
          console.log(e);
          // TODO: Update UI
        }
      } else {
        this.$store.commit('incrementPage');
      }
    },
    hasNextPage() {
      // get the stored todos for the next page.
      const nextTodos = this.$store.getters.getTodos
        .slice((this.getPage) * this.limit, ((this.getPage) * this.limit) + this.limit);

      // If there are no stored todos, then fetch
      if (nextTodos.length === 0) return false;

      // Is the next page the last page?
      const isLastPage = this.maxPage === this.getPage + 1;

      // If last page...
      if (isLastPage) {
        // Are all the todos stored?
        // If so then return true, else fetch the last.
        return this.$store.getters.getTodos.length === this.count;
      }
      // if not last page, return true if has enough to fill the page, else return false.
      return nextTodos.length === this.limit;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
