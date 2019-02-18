<template lang="pug">
  footer#footer-bar.footer.has-text-centered.is-small
    div.container
      p.is-size-5.header Todos
      p.content Todos, created by&nbsp;
        |
        a(
        href="https://dwelsh.uk"
        ) Daniel Welsh
        | , and licenced under&nbsp;
        a(
        href="https://opensource.org/licenses/MIT"
        ) MIT
        | . Checkout the&nbsp;
        a(
          href="https://github.com/wel-shy/todo-webapp"
        ) webapp
        | &nbsp;and&nbsp;
        a(
        href="https://github.com/wel-shy/todo"
        ) API
        | &nbsp;on Github.
</template>

<script>
export default {
  name: 'FooterBar',
};
</script>

<style lang="scss" scoped>
  footer {
    height: 200px;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding-bottom: 10px;

    .header{
      padding-top: 0;
    }
    .content {
      padding-bottom: 0;
      padding-top: 20px;
    }
  }
  p {
    padding-top: 5%;
  }
</style>
