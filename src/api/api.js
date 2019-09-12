import axios from 'axios'
import { Loading, Message } from 'element-ui'
import router from '@/router'

//axios 配置
axios.defaults.timeout = 30000; 
// axios.defaults.withCredentials = true;
axios.defaults.headers.common['Pragma'] = 'no-cache';
axios.defaults.headers.common['Cache-Control'] = 'no-cache';

let loadinginstace
let needLoadingRequestCount = 0

function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    loadinginstace = Loading.service({ target: '#wxloding' })
  }
  needLoadingRequestCount++;
}
function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    loadinginstace.close()
  }
}
axios.interceptors.request.use(config=>{
  //请求发送之前显示loading
  if(!config.headers.isHideLoading){
    showFullScreenLoading()
  }
  return config
}, error => {
  tryHideFullScreenLoading()
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})

//返回状态判断
axios.interceptors.response.use(data=>{
  //响应回来之后，隐藏loading
  tryHideFullScreenLoading()
  return data.data
}, error => {
  tryHideFullScreenLoading()
  if(error.response.status === 401){
    Message.error({
      message: error.response.data.message.global?error.response.data.message.global:'登陆超时，请重新登陆！'
    })
    router.push({ path: '/login' })
    return false
  }

  Message.error({
    message: '加载失败'
  })
  return Promise.reject(error.response)
})

// const contextPath = '/dx-school-web'
export default {
  
}