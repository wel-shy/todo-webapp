/**
 Created:  2019-02-16
 Author:   Daniel
 Description:
 -
 */
import axios from 'axios';

const URL = 'http://localhost:3333/api';

export default class API {
  static async login(username, password) {
    const loginData = {
      username,
      password,
    };

    const response = await axios.post(`${URL}/auth/authenticate`, loginData);

    return response.data.payload.token;
  }

  static async register(username, password) {
    const registerData = {
      username,
      password,
    };
    const response = await axios.post(`${URL}/auth/register`, registerData);

    return response.data.payload.token;
  }

  static async getAllTodos(token) {
    const response = await axios.get(`${URL}/todo/`, { headers: { 'x-access-token': token } });
    return response.data.payload;
  }

  static async storeTodo(todoData, token) {
    const response = await axios.post(`${URL}/todo/`, todoData, { headers: { 'x-access-token': token } });
    return response.data.payload;
  }

  static async deleteTodo(id, token) {
    const response = await axios.delete(`${URL}/todo/${id}`, { headers: { 'x-access-token': token } });
    return response.data.status;
  }

  static async updateTodo(todo, token) {
    const response = await axios.post(`${URL}/todo/update`, todo, { headers: { 'x-access-token': token } });
    return response.data.payload;
  }
}
