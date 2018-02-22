// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import axios from 'axios'
axios.defaults.withCredentials=true;
Vue.prototype.$ajax = axios
// 导入vuex
import store from './store/store'
import './assets/css/app.scss'
Vue.use(ElementUI)

Vue.config.productionTip = false

//富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
    data () {
        return {
            clientHeight: ''
        }
    },
    mounted: function () {
        // document.documentElement.style.fontSize = document.documentElement.clientWidth / 100 + 'px';
        // const that = this;
        // window.onresize = function(){
        //     document.documentElement.style.fontSize = document.documentElement.clientWidth / 100 + 'px';
        // }
    }
})
