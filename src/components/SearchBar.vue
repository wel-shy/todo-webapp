<template lang="pug">
  div#search-bar
    div.field.has-addons.has-addons-centered
      div.control.text-input
        input.input(
          type="text",
          placeholder="Search",
          v-model="task",
          v-on:keyup.enter="searchTasks"
        )
      div.control
        a#submit-todo.button.is-info.is-outlined(
          :disabled="task.length < 1"
          @click="searchTasks"
        )
          span.icon.is-small
            i.fas.fa-search
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      task: '',
    };
  },
  methods: {
    searchTasks() {
      this.$emit('search-todos', this.task);
      this.task = '';
    },
  },
};
</script>

<style lang="scss" scoped>
  .text-input {
    width: 50%;
  }
</style>
