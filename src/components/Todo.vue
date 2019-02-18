<template lang="pug">
    div#todo.container(
      :class="{'done': todo.done}"
    )
      div.box
        div.columns.is-mobile
          div.column.has-text-left.is-narrow
            div.field.has-addons.control-buttons
              p.control
                a#done-button.button.done-button.is-outlined(
                  @click="toggleDone",
                  :class="{'is-primary': todo.done}"
                )
                  span.icon.is-small
                    i.far.fa-check-circle
              p.control
                a#edit-button.button.done-button.is-outlined(
                  @click="toggleEdit",
                )
                  span.icon.is-small
                    i.far.fa-edit
          div.column.has-text-left.column
            p#task-text.task(
              v-if="!isBeingEdited"
            ) {{ todo.task }}
            div.field.has-addons.has-addons-centered(
              v-else
            )
              div.control.text-input
                input.input(
                type="text",
                v-model="todo.task",
                v-on:keyup.enter="updateTodo"
                )
          div.column.has-text-right.column
            div.field.has-addons.control-buttons
              p.control
                a.button.is-warning.is-outlined(
                  @click="archive"
                )
                  span.icon.is-small
                    i.fas.fa-archive
              p.control
                a#delete-button.button.is-danger.is-outlined(
                  @click="deleteTodo"
                )
                  span.icon.is-small
                    i.fas.fa-times
</template>

<script>
import API from '../API';

export default {
  props: ['todo'],
  name: 'Todo',
  data() {
    return {
      isBeingEdited: false,
    };
  },
  methods: {
    async deleteTodo() {
      if (this.$store.getters.getToken.length > 0) {
        await API.deleteTodo(this.todo._id, this.$store.getters.getToken);
      }
      this.$store.commit('deleteTodo', this.todo._id);
      this.$store.commit('decrementCount');
    },
    toggleEdit() {
      this.isBeingEdited = !this.isBeingEdited;
    },
    async toggleDone() {
      const newTodo = this.todo;
      newTodo.done = !this.todo.done;

      if (this.$store.getters.getToken.length > 0) {
        await API.updateTodo(newTodo, this.$store.getters.getToken);
      }

      this.$store.commit('updateTodo', newTodo);
    },
    async archive() {
      const newTodo = this.todo;
      newTodo.archived = true;

      if (this.$store.getters.getToken.length > 0) {
        await API.updateTodo(newTodo, this.$store.getters.getToken);
      }

      this.$store.commit('addArchived', newTodo);
      this.$store.commit('incrementArchiveCount');
      this.$store.commit('deleteTodo', newTodo._id);
    },
    async updateTodo() {
      if (this.$store.getters.getToken) {
        try {
          await API.updateTodo(this.todo, this.$store.getters.getToken);
          this.$store.commit('updateTodo', this.todo);
        } catch (e) {
          console.error(e);
        }
      } else {
        this.$store.commit('updateTodo', this.todo);
      }

      this.isBeingEdited = false;
    },
  },
};
</script>

<style lang="scss" scoped>
#todo {
  $margin: 5px;

  width: 85%;

  margin-top: 5px;
  margin-bottom: 5px;

  .control-buttons {
    float: right;
  }

  .text-input {
    width: 100%;
  }
}

  .done {
    text-decoration: line-through;

    .task {
      color: #00d1b2;
      font-weight: bold;
    }
  }
</style>
