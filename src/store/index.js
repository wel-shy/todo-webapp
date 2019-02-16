/**
 Created:  2019-02-16
 Author:   Daniel
 Description:
 -
 */

// index.js
import Vue from 'vue';
import Vuex from 'vuex';

import todo from './modules/todo';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    todo,
  },
});
