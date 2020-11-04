import axios from 'axios';

const host = 'http://localhost:1337';

export function getList() {
  return axios.get(`${host}/products`)
    .then(data => data)
    .catch(err => {
      console.log(err);
      return null;
    });
}

export function postOrder(data) {
  return axios.post(`${host}/orders`, data)
    .then(res => res)
    .catch(err => {
      console.log(err);
      return null;
    });
}