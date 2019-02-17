/* eslint-disable no-undef */
/**
 Created:  2019-02-17
 Author:   Daniel
 Description:
 -
 */

/* eslint-disable global-require */
import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import Login from '../../../src/components/Login.vue';
import store from '../../../src/store';

describe('Auth', () => {
  describe('Login.vue', () => {
    it('Should initialise the component with empty credentials', () => {
      const data = Login.data();
      expect(data.username).to.equal('');
      expect(data.password).to.equal('');
    });

    describe('Login', () => {
      it('Should throw an error when form submitted with empty credentials', (done) => {
        const wrapper = mount(Login);
        const submit = wrapper.find('#login-submit');

        try {
          submit.trigger('click');
        } catch (e) {
          expect(e.message).contains('cannot be empty');
        } finally {
          done();
        }
      });

      it('Should disable submit if no password or username present', () => {
        const wrapper = mount(Login);
        const submit = wrapper.find('#login-submit');

        expect(submit.html()).contains('disabled');
      });

      it('Should register the user', (done) => {
        const wrapper = mount(Login);
        wrapper.setData({
          username: 'daniel',
          password: 'secret',
        });

        wrapper.vm.$store = store;

        wrapper.vm.login()
          .then(() => {
            expect(wrapper.vm.$store.getters.getToken.length).to.be.greaterThan(0);
            done();
          });
      });

      it('Should store a token on authentication', (done) => {
        const wrapper = mount(Login);
        wrapper.setData({
          username: 'daniel',
          password: 'secret',
        });

        wrapper.vm.$store = store;

        wrapper.vm.login()
          .then(() => {
            expect(wrapper.vm.$store.getters.getToken.length).to.be.greaterThan(0);
            done();
          });
      });

      it('Should store a token on register', (done) => {
        const wrapper = mount(Login);
        wrapper.setData({
          username: Math.random().toString(36).substring(7),
          password: 'secret',
        });

        wrapper.vm.$store = store;

        wrapper.vm.register()
          .then(() => {
            expect(wrapper.vm.$store.getters.getToken.length).to.be.greaterThan(0);
            done();
          });
      });
    });

    describe('Register', () => {
      it('Should throw an error when form submitted with empty credentials', (done) => {
        const wrapper = mount(Login);
        const submit = wrapper.find('#register-submit');

        try {
          submit.trigger('click');
        } catch (e) {
          expect(e.message).contains('cannot be empty');
        } finally {
          done();
        }
      });

      it('Should disable submit if no password or username present', () => {
        const wrapper = mount(Login);
        const submit = wrapper.find('#register-submit');

        expect(submit.html()).contains('disabled');
      });
    });
  });
});
