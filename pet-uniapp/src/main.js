import Vue from 'vue'
import App from './App'
import request from '@/utils/request'
Vue.config.productionTip = false

import uView from "uview-ui";
Vue.use(uView);

App.mpType = 'app'
Vue.prototype.request = request
const app = new Vue({
    ...App
})
app.$mount()