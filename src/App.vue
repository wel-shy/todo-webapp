<template lang="pug">
  div#app
    TitleBar
    NewTodo
    AllTodos
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import NewTodo from './components/NewTodo.vue';
import AllTodos from './components/AllTodos.vue';

export default {
  name: 'app',
  components: {
    AllTodos,
    NewTodo,
    HelloWorld,
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
