/* eslint-disable no-shadow,no-param-reassign,no-underscore-dangle */
/**
 Created:  2019-02-16
 Author:   Daniel
 Description:
 -
 */

const state = {
  todos: [],
  pageSize: 10,
  page: 1,
  limit: 5,
  count: 0,
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

  updateCount: (state, payload) => {
    state.count = payload;
  },

  incrementCount: (state) => {
    state.count += 1;
  },

  decrementCount: (state) => {
    state.count -= 1;
  },

  incrementPage: (state) => {
    state.page += 1;
  },

  decrementPage: (state) => {
    state.page -= 1;
  },

  addTodo: (state, payload) => {
    state.todos.unshift(payload);
  },

  deleteTodo: (state, id) => {
    const idx = state.todos.findIndex(todo => todo._id === id);
    state.todos.splice(idx, 1);
  },
};

const actions = {};

const getters = {
  getTodos: state => state.todos.filter(todo => !todo.archived),

  getPage: state => state.page,

  getLimit: state => state.limit,

  getTodoById: state => (id) => {
    const idx = state.todos.findIndex(todo => todo._id === id);
    if (idx < 0) return null;
    return state.todos[idx];
  },

  getArchived: state => state.todos.filter(todo => todo.archived === true),

  getCount: state => state.count,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
