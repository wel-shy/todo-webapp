/**
 Created:  2019-02-17
 Author:   Daniel
 Description:
 -
 */

/* eslint-disable no-shadow,no-param-reassign,no-underscore-dangle */
/**
 Created:  2019-02-16
 Author:   Daniel
 Description:
 -
 */

const state = {
  token: '',
};

const mutations = {
  updateToken: (state, payload) => {
    state.token = payload;
  },

  deleteToken: (state) => {
    state.token = '';
  },
};

const actions = {};

const getters = {
  getToken: state => state.token,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
