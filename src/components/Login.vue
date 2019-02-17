<template lang="pug">
  div#login
    div.container
      p Login to save your list!
      div.field.is-horizontal.login-form
        div.field-body
          div.field
            p.control.is-expanded.has-icons-left
              input.input(
                type="text",
                placeholder="username",
                v-model="username",
              )
              span.icon.is-small.is-left
                i.fas.fa-user
          div.field
            p.control.is-expanded.has-icons-left
              input.input(
              type="password",
              placeholder="password",
              v-model="password",
              )
              span.icon.is-small.is-left
                i.fas.fa-lock
    div.container
      button.button.is-info(
        :disabled="username.length < 1 || password.length < 1",
        @click="login"
      )
        p Login
      button.button.is-info.is-outlined(
        :disabled="username.length < 1 || password.length < 1",
        @click="register"
      )
        p Register
</template>

<script>
import API from '../API';
import Cookie from '../cookie';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      isNotificationHidden: true,
      notificationText: '',
    };
  },
  methods: {
    async login() {
      // Throw an error is username or password is not provided
      if (this.username.length === 0 || this.password.length === 0) throw new Error('Username or password cannot be empty.');

      // Try to get the token
      let token;
      try {
        token = await API.login(this.username, this.password);
      } catch (e) {
        this.isNotificationHidden = false;
        switch (e.response.data.code) {
          case 401:
            this.notificationText = 'Username or password is incorrect';
            break;
          default:
            this.notificationText = 'Something went wrong';
            break;
        }
      }

      // Store the cookie
      if (token) {
        Cookie.set(token);
        this.$store.commit('updateToken', token);
        this.$emit('authenticated');
      }
    },
    async register() {
      // Throw an error is username or password is not provided
      if (this.username.length === 0 || this.password.length === 0) throw new Error('Username or password cannot be empty.');

      // Try to get the token
      let token;
      try {
        token = await API.register(this.username, this.password);
      } catch (e) {
        this.isNotificationHidden = false;
        switch (e.response.data.code) {
          case 403:
            this.notificationText = 'Username is already taken';
            break;
          default:
            this.notificationText = 'Something went wrong';
            break;
        }
      }

      // Store the cookie
      if (token) {
        Cookie.set(token);
        this.$store.commit('updateToken', token);
        this.$emit('authenticated');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  #login {
    margin-top: 1.25%;
  }

  p {
    margin-bottom: 1.25%;
  }
.button {
  margin-top: 5px;
  margin-left: 2px;
  margin-right: 2px;
}
  .login-form {
    width: 52.5%;
    margin-left: auto;
    margin-right: auto;
  }
</style>
