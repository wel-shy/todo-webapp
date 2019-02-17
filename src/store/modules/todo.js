/* eslint-disable no-shadow,no-param-reassign,no-underscore-dangle */
/**
 Created:  2019-02-16
 Author:   Daniel
 Description:
 -
 */

const state = {
  todos: [],
};

const mutations = {
  updateTodos: (state, payload) => {
    state.todos = payload;
  },

  updateTodo: (state, payload) => {
    const idx = state.todos.findIndex(todo => todo._id === payload._id);
    if (idx >= 0) {
      state.todos[idx] = payload;
    }
  },

  addTodo: (state, payload) => {
    state.todos.push(payload);
  },

  deleteTodo: (state, id) => {
    const idx = state.todos.findIndex(todo => todo._id === id);
    state.todos.splice(idx, 1);
  },
};

const actions = {};

const getters = {
  getTodos: state => state.todos,

  getTodoById: state => (id) => {
    const idx = state.todos.findIndex(todo => todo._id === id);
    if (idx < 0) return null;
    return state.todos[idx];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
