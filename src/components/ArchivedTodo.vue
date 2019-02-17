<template lang="pug">
  div#archived-todo.container(
    :class="{'done': todo.done}"
  )
    div.box
      div.columns.is-mobile
        div.column.has-text-left.is-narrow
          a#done-button.button.done-button.is-light.is-outlined(
            :class="{'is-primary': todo.done}"
          )
            span.icon.is-small
              i.far.fa-check-circle
        div.column.has-text-left.column
          p#task-text.task {{ todo.task }}
        div.column.has-text-right.column
          div.field.has-addons.control-buttons
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
  name: 'ArchivedTodo',
  props: ['todo'],
  methods: {
    async deleteTodo() {
      if (this.$store.getters.getToken.length > 0) {
        await API.deleteTodo(this.todo._id, this.$store.getters.getToken);
      }
      this.$store.commit('deleteTodo', this.todo._id);
    },
  },
};
</script>

<style lang="scss" scoped>
  #archived-todo {
    $margin: 5px;

    width: 85%;

    margin-top: 5px;
    margin-bottom: 5px;

    .control-buttons {
      float: right;
    }

    .box {
      background-color: #DDDDDD;

      p {
        color: #888888;
      }
    }

    #done-button:hover {
      background: transparent;
      color: white;
      cursor: auto;
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
