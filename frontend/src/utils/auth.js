const baseUrl = 'http://api.bonnhelga86.nomoreparties.co';

const errorsCode = {
  register: {
    400: 'Некорректно заполнено одно из полей'
  },
  authorize: {
    400: 'Не передано одно из полей',
    401: 'Пользователь с email не найден'
  },
  tokenCheck: {
    400: 'Токен не передан или передан не в том формате',
    401: 'Переданный токен некорректен'
  }
}

function getResponseData(res, type) {
  if (!res.ok) {
      return Promise.reject(errorsCode[type][res.status]);
  }
  return res.json();
}

export const register = (email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})
  }).then(res => getResponseData(res, 'register'))
}

export const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})
  }).then(res => getResponseData(res, 'authorize'))
}

export const unauthorize = () => {
  return fetch(`${baseUrl}/signout`, {
    method: 'get',
    credentials: 'include',
  }).then(res => getResponseData(res, 'authorize'))
}

export const tokenCheck = () => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    credentials: 'include',
  }).then(res => getResponseData(res, 'tokenCheck'))
}
