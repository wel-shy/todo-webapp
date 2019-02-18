<template lang="pug">
  div#archived.container
    h2.is-size-3.has-text-centered 🗃 Archive
    div.archives
      ArchivedTodo(
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
import ArchivedTodo from './ArchivedTodo.vue';
import API from '../API';

export default {
  name: 'Archived',
  components: { ArchivedTodo },
  computed: {
    todos() {
      return this.$store.getters.getArchived
        .slice((this.getPage - 1) * this.limit, ((this.getPage - 1) * this.limit) + this.limit);
    },
    maxPage() {
      return Math.ceil(this.count / this.limit);
    },
    getPage() {
      return this.$store.getters.getArchivePage;
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
      return this.$store.getters.getArchiveCount;
    },
  },
  methods: {
    updatePage(direction) {
      if (direction > 0) {
        this.fetchNextPage();
      } else {
        this.$store.commit('decrementArchivePage');
      }
    },
    async fetchNextPage() {
      if (!this.hasNextPage()) {
        try {
          const payload = await API.getPagedArchived(
            this.getPage + 1,
            this.limit,
            this.$store.getters.getToken,
          );

          console.log(payload);

          this.$store.commit('appendArchive', payload.resources);
          this.$store.commit('updateArchiveCount', payload.count);
          this.$store.commit('incrementArchivePage');
        } catch (e) {
          console.log(e);
          // TODO: Update UI
        }
      } else {
        this.$store.commit('incrementArchivePage');
      }
    },
    hasNextPage() {
      // get the stored todos for the next page.
      const nextTodos = this.$store.getters.getArchived
        .slice((this.getPage) * this.limit, ((this.getPage) * this.limit) + this.limit);

      // If there are no stored todos, then fetch
      if (nextTodos.length === 0) return false;

      // Is the next page the last page?
      const isLastPage = this.maxPage === this.getPage + 1;

      // If last page...
      if (isLastPage) {
        // Are all the todos stored?
        // If so then return true, else fetch the last.
        return this.$store.getters.getArchived.length === this.count;
      }
      // if not last page, return true if has enough to fill the page, else return false.
      return nextTodos.length === this.limit;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
