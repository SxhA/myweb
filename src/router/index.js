import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout'
import Category from '@/components/Category'
import Login from '@/components/login'
import List from '@/components/views/list'
import About from '@/components/views/about'
import Edit from '@/components/views/edit'
import Note from '@/components/views/note'

import axios from 'axios'
axios.defaults.withCredentials=true;
import store from '../store/store'


Vue.use(Router)
const router =  new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/management'
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/management',
            name: 'layout',
            component: Layout,
            children: [
                {
                    path: '',
                    name: 'category',
                    component: Category
                },
                {
                    path: 'list/:category?/:type?',
                    name: 'list',
                    component: List,
                    props: true
                },
                {
                    path: 'about',
                    name: 'about',
                    component: About
                },
                {
                    path: 'note/:id?',
                    name: 'note',
                    component: Note,
                    props: true
                },
                {
                    path: 'edit',
                    name: 'edit',
                    component: Edit
                }
            ]
        }
    ]
}) 
router.beforeEach((to, from, next)=>{
    let toUrl = to.name
    let fromUrl = from.name
    axios.post('/api/islogin', {})
        .then(function (res) {
            //console.log(res)
            if(res.flag == 0){//已经登录过
                store.commit('menuLogin', {menuShow: true})
                if(fromUrl == 'null'){//这里判断成功后需要回到那个路由
                    router.push('/')
                }else{
                    router.push(fromUrl)
                }
            }else{//如果没有登录的话回到之前的路由
                //router.push('/')
                console.log('未登录状态')
            }
        })
        .catch(function (err) {
            console.log(err);
    });
    next();
});

export default router;