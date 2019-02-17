<template lang="pug">
    div#todo.container(
      :class="{'done': todo.done}"
    )
      div.box
        div.columns.is-mobile
          div.column.has-text-left.is-narrow
            a.button.done-button.is-outlined(
              @click="toggleDone",
              :class="{'is-primary': todo.done}"
            )
              span.icon.is-small
                i.far.fa-check-circle
          div.column.has-text-left.column
            p.task {{ todo.task }}
          div.column.has-text-right.column
            div.field.has-addons.control-buttons
              p.control
                a.button.is-warning.is-outlined
                  span.icon.is-small
                    i.fas.fa-archive
              p.control
                a.button.is-danger.is-outlined(
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
  methods: {
    async deleteTodo() {
      if (this.$store.getters.getToken.length > 0) {
        await API.deleteTodo(this.todo._id, this.$store.getters.getToken);
      }
      this.$store.commit('deleteTodo', this.todo._id);
    },
    async toggleDone() {
      const newTodo = this.todo;
      newTodo.done = !this.todo.done;

      if (this.$store.getters.getToken.length > 0) {
        await API.updateTodo(newTodo, this.$store.getters.getToken);
      }

      this.$store.commit('updateTodo', newTodo);
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
}

  .done {
    text-decoration: line-through;

    .task {
      color: #00d1b2;
      font-weight: bold;
    }
  }
</style>
