<template lang="pug">
  div#notification
    div.notification.box.is-danger.is-outlined
      button.delete(
      @click="emitClose"
      )
      slot
</template>

<script>
export default {
  name: 'Notification',
  methods: {
    emitClose() {
      this.$emit('closed');
    },
  },
};
</script>

<style scoped>

</style>
