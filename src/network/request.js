import axios from 'axios'
import {BaseURL} from 'common/const'

export function request(config) {
  const instance = axios.create({
    baseURL: BaseURL,
    timeout: 4000
  })

  instance.interceptors.request.use(config => {
    // console.log(config);
    return config;
  }, err => {
    console.log(err);
  })

  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data;
  }, err => {
    console.log(err);
  })

  return instance(config)
}
