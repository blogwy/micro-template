import singleSpaVue from 'single-spa-vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import moment from 'moment'

import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './assets/style/main.less'

import apiRegister from './config/api/api-register'

moment.locale('zh-cn')
Vue.prototype.$moment = moment

Vue.use(antd)

Vue.config.productionTip = false

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render: (h) => h(App),
    router,
    store
  }
})

export function mount (props) {
  // 注册 api 到全局
  Vue.prototype.$api = apiRegister(props.httpModule)

  return vueLifecycles.mount(props)
}
export const bootstrap = vueLifecycles.bootstrap
export const unmount = vueLifecycles.unmount
