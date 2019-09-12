import axios from '../api'

export default {
  login(data){
    return axios.post(`/scapi/worker/pc/admin/common/access`,data)
  }
}