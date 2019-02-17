/* eslint-disable no-undef */
/**
 Created:  2019-02-17
 Author:   Daniel
 Description:
 -
 */
import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import Vue from 'vue';
import NewTodo from '../../../src/components/NewTodo.vue';
import Todo from '../../../src/components/Todo.vue';
import store from '../../../src/store';

describe('Todo', () => {
  describe('NewTodo.vue', () => {
    const wrapper = mount(NewTodo, { store });
    it('Should disable submit if no task', () => {
      const submit = wrapper.find('#submit-todo');

      expect(submit.html()).contains('disabled');
    });

    it('Should throw an error if empty todo submitted', (done) => {
      wrapper.vm.addTodo()
        .then()
        .catch((e) => {
          expect(e.message).contains('cannot be empty');
          done();
        });
    });

    it('Should add a todo to the store when submitted', (done) => {
      wrapper.setData({
        task: 'new todo',
      });

      const todosLength = wrapper.vm.$store.getters.getTodos.length;

      wrapper.vm.addTodo()
        .then(() => {
          expect(wrapper.vm.$store.getters.getTodos.length).to.equal(todosLength + 1);
          done();
        });
    });
  });

  describe('Todo.vue', () => {
    const todoData = {
      _id: '5c694230f0c087001319203d',
      task: 'new',
      done: false,
      userId: '5c68343b111202001101ff4a',
      createdAt: '2019-02-17T11:14:56.076Z',
      updatedAt: '2019-02-17T11:14:56.076Z',
      __v: 0,
    };
    store.commit('addTodo', todoData);

    const wrapper = mount(Todo, { propsData: { todo: todoData }, store });

    it('Should update on tick press', (done) => {
      const doneButton = wrapper.find('#done-button');
      doneButton.trigger('click');

      Vue.nextTick(() => {
        const t = wrapper.vm.$store.getters.getTodoById(todoData._id);
        expect(t.done).to.equal(todoData.done);
        done();
      });
    });

    it('Should update update ui when done', (done) => {
      wrapper.setData({
        done: true,
      });

      Vue.nextTick(() => {
        const todoText = wrapper.find('#todo');
        const idx = todoText.classes().findIndex(c => c === 'done');
        expect(idx).to.be.greaterThan(0);
        done();
      });
    });

    it('Should remove the item from the store on button press', (done) => {
      wrapper.setData({
        done: true,
      });

      const doneButton = wrapper.find('#delete-button');
      doneButton.trigger('click');

      Vue.nextTick(() => {
        const t = wrapper.vm.$store.getters.getTodoById(todoData._id);
        expect(t).to.equal(null);
        done();
      });
    });
  });
});
