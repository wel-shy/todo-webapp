/* eslint-disable no-shadow,no-param-reassign,no-underscore-dangle */
/**
 Created:  2019-02-16
 Author:   Daniel
 Description:
 -
 */

const state = {
  todos: [],
  archived: [],
  page: 1,
  archivePage: 1,
  limit: 5,
  count: 0,
  archiveCount: 0,
};

const mutations = {
  updateTodos: (state, payload) => {
    state.todos = payload;
  },

  updateArchived: (state, payload) => {
    state.archived = payload;
  },

  updateTodo: (state, payload) => {
    const idx = state.todos.findIndex(todo => todo._id === payload._id);
    if (idx >= 0) {
      state.todos[idx] = payload;
    }
  },

  appendTodos: (state, payload) => {
    payload.forEach((t) => {
      state.todos.push(t);
    });
  },

  appendArchive: (state, payload) => {
    payload.forEach((t) => {
      state.archived.push(t);
    });
  },

  updateCount: (state, payload) => {
    state.count = payload;
  },

  updateArchiveCount: (state, payload) => {
    state.archiveCount = payload;
  },

  incrementCount: (state) => {
    state.count += 1;
  },

  decrementCount: (state) => {
    state.count -= 1;
  },

  incrementArchiveCount: (state) => {
    state.archiveCount += 1;
  },

  decrementArchiveCount: (state) => {
    state.archiveCount -= 1;
  },

  incrementPage: (state) => {
    state.page += 1;
  },

  decrementPage: (state) => {
    state.page -= 1;
  },

  incrementArchivePage: (state) => {
    state.archivePage += 1;
  },

  decrementArchivePage: (state) => {
    state.archivePage -= 1;
  },

  addTodo: (state, payload) => {
    state.todos.unshift(payload);
  },

  addArchived: (state, payload) => {
    state.archived.unshift(payload);
  },

  deleteTodo: (state, id) => {
    const idx = state.todos.findIndex(todo => todo._id === id);
    state.todos.splice(idx, 1);
  },

  deleteArchived: (state, id) => {
    const idx = state.archived.findIndex(todo => todo._id === id);
    state.archived.splice(idx, 1);
  },
};

const actions = {};

const getters = {
  getTodos: state => state.todos,

  getPage: state => state.page,

  getArchivePage: state => state.archivePage,

  getLimit: state => state.limit,

  getTodoById: state => (id) => {
    const idx = state.todos.findIndex(todo => todo._id === id);
    if (idx < 0) return null;
    return state.todos[idx];
  },

  getArchived: state => state.archived,

  getCount: state => state.count,

  getArchiveCount: state => state.archiveCount,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
