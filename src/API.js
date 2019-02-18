/**
 Created:  2019-02-16
 Author:   Daniel
 Description:
 -
 */
import axios from 'axios';
import mock from '../mock.json';

const URL = 'http://localhost:3333/api';

function isTest() {
  return process.env.NODE_ENV === 'test';
}

export default class API {
  static async login(username, password) {
    const loginData = {
      username,
      password,
    };
    let response;

    if (isTest()) {
      response = mock.authenticate;
    } else {
      response = await axios.post(`${URL}/auth/authenticate`, loginData);
    }

    return response.data.payload.token;
  }

  static async register(username, password) {
    const registerData = {
      username,
      password,
    };
    let response;

    if (isTest()) {
      response = mock.register;
    } else {
      response = await axios.post(`${URL}/auth/register`, registerData);
    }

    return response.data.payload.token;
  }

  static async getAllTodos(token) {
    let response;

    if (isTest()) {
      response = mock.allTodos;
    } else {
      response = await axios.get(`${URL}/todo/`, { headers: { 'x-access-token': token } });
    }

    return response.data.payload;
  }

  static async getPagedTodos(page, limit, token) {
    let response;

    if (isTest()) {
      response = mock.allTodos;
    } else {
      response = await axios.get(`${URL}/todo/${page}/${limit}?archived=false`, { headers: { 'x-access-token': token } });
    }

    return response.data.payload;
  }

  static async getPagedArchived(page, limit, token) {
    let response;

    if (isTest()) {
      response = mock.allTodos;
    } else {
      response = await axios.get(`${URL}/todo/${page}/${limit}?archived=true`, { headers: { 'x-access-token': token } });
    }

    return response.data.payload;
  }

  static async storeTodo(todoData, token) {
    let response;

    if (isTest()) {
      response = mock.storeTodo;
    } else {
      response = await axios.post(`${URL}/todo/`, todoData, { headers: { 'x-access-token': token } });
    }

    return response.data.payload;
  }

  static async deleteTodo(id, token) {
    let response;

    if (isTest()) {
      response = mock.deleteTodo;
    } else {
      response = await axios.delete(`${URL}/todo/${id}`, { headers: { 'x-access-token': token } });
    }

    return response.data.status;
  }

  static async updateTodo(todo, token) {
    let response;

    if (isTest()) {
      response = mock.updateTodo;
    } else {
      response = await axios.post(`${URL}/todo/update`, todo, { headers: { 'x-access-token': token } });
    }
    return response.data.payload;
  }
}
