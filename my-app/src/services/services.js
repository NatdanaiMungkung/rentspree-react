import axios from 'axios';

export function getList() {
  return axios.get('http://localhost:1337/products')
    .then(data => data)
    .catch(err => {
      console.log(err);
      return null;
    });
}