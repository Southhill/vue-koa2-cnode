// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
<<<<<<< HEAD
import VueTouch from 'vue-touch'
import vueRouter from 'vue-router'
=======
>>>>>>> spa

import ElementUI, { MessageBox, Loading, Message } from 'element-ui'
import * as moment from 'moment'

import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons'

<<<<<<< HEAD
Vue.use(vueRouter)
Vue.use(VueTouch)
=======
import App from './App'
import router from './router'
import FormTopic from '@/components/FormTopic'

// import '@/less/global'

Vue.use(ElementUI)

moment.locale('zh-cn')

Vue.config.productionTip = false

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$msg = Message

Vue.prototype.$bus = new Vue() // 事件中转

window.moment = moment

// 全局过滤器
Vue.filter('localeTime', function (value) {
  return moment(value).fromNow()
})
Vue.filter('tagName', function (tag) {
  return {
    top: '置顶',
    good: '精华',
    ask: '问答',
    share: '分享',
    job: '招聘',
    dev: '开发测试'
  }[tag] || ''
})
// 全局组件
Vue.component('icon', Icon)
Vue.component('FormTopic', FormTopic)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
>>>>>>> spa
