import axios from 'axios'
// 进行二次全局配置
// 跟路径配置
axios.defaults.baseURL = 'http://127.0.0.1:3000'
// 超时时间配置
axios.defaults.timeout = 3000

export default {
  get: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.get(path, {
        params: data
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  post: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.post(path, data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
