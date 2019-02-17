<template lang="pug">
  div#app
    NewTodo
    AllTodos
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import NewTodo from './components/NewTodo.vue';
import AllTodos from './components/AllTodos.vue';
import Cookie from './cookie';
import API from './API';

export default {
  name: 'app',
  components: {
    AllTodos,
    NewTodo,
    HelloWorld,
  },
  async mounted() {
    // Get the token from cookie if exists and write to store.
    const token = Cookie.get('authToken');
    if (token) {
      this.$store.commit('updateToken', token);

      try {
        const response = await API.getAllTodos(this.$store.getters.getToken);
        this.$store.commit('updateTodos', response);
      } catch (e) {
        console.log(e);
        // TODO: Update UI
      }
    }
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
