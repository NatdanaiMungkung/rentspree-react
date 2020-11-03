import axios from 'axios';

export function getList() {
  return axios.get('http://localhost:1337/products')
    .then(data => data)
    .catch(err => {
      console.log(err);
      return null;
    });
}

export function postOrder(data) {
  return axios.post('http://localhost:1337/orders', data)
    .then(res => res)
    .catch(err => {
      console.log(err);
      return null;
    });
}