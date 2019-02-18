<template lang="pug">
  footer#footer-bar.footer.has-text-centered.is-small
    div.container
      p.is-size-5 Todos
      p Todos, created by&nbsp;
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
        br
        | If you have any questions about your data or wish for it to be removed, then please
        | send an email to&nbsp;
        a(
        href="mailto:e@dwelsh.uk"
        ) e@dwelsh.uk
</template>

<script>
export default {
  name: 'FooterBar',
};
</script>

<style scoped>
  footer {
    height: 300px;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  p {
    padding-top: 5%;
  }
</style>
