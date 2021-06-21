import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入reset.css
import "normalize.css"
//引入vant组件
import Icon from 'vant';
import 'vant/lib/index.css';
Vue.use(Icon);
import { Cell, CellGroup, Form, Field} from 'vant';
Vue.use(Cell)
  .use(CellGroup)
  .use(Form)
  .use(Field);
// 引入公共样式
import  "@/style/common-style.css" 
import  "@/style/theme.less" 
// 引入request并添加到prototype上
import { request } from "@/utils/request"
Vue.prototype.request = request;
// 引入创建dom的函数并且添加到prototype上
import createDom from "@/utils/createDom"
Vue.prototype.createDom = createDom;

// // 引入自动化引入icons/svg文件夹下所有svg的js文件
import "@/assets/icons"

Vue.config.productionTip = false
//全局引入header
import CommonHeader from './components/CommonHeader.vue'
Vue.component('common-header',CommonHeader)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

