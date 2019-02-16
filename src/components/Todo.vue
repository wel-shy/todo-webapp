<template lang="pug">
    div#todo.container(
      :class="{'done': todo.done}"
    )
      div.box
        div.columns.is-mobile
          div.column.has-text-left.is-one-fifth
            a.button.done-button(
              @click="toggleDone",
              :class="{'is-primary': todo.done}"
            )
              span.icon.is-small
                i.far.fa-check-circle
          div.column.has-text-left.is-three-fifths
            p.task {{ todo.task }}
          div.column.has-text-right.is-one-fifth
            div.field.has-addons.control-buttons
              p.control
                a.button.is-warning
                  span.icon.is-small
                    i.fas.fa-archive
              p.control
                a.button.is-danger(
                  @click="deleteTodo"
                )
                  span.icon.is-small
                    i.fas.fa-times
</template>

<script>
export default {
  props: ['todo'],
  name: 'Todo',
  methods: {
    deleteTodo() {
      this.$store.commit('deleteTodo', this.todo._id);
    },
    toggleDone() {
      const newTodo = this.todo;
      newTodo.done = !this.todo.done;
      console.log('setting done');

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
