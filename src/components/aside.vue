<template>
    <el-container>
        
        <el-menu 
            default-active="2" 
            class="el-menu-vertical-demo" 
            @open="handleOpen" 
            @close="handleClose" 
            background-color="#293f54" 
            text-color="#fff" 
            active-text-color="#ffd04b"
            :unique-opened="true">
            <el-submenu index="1">
                <template slot="title">
                    <i class="fa fa-html5"></i>
                    <span>前端</span>
                </template>

                    <router-link :to="{name: 'list', params: {category: 1, type: 1}}" tag="div">
                        <el-menu-item index="1-1">
                            Html
                        </el-menu-item>
                    </router-link>

                    <router-link :to="{name: 'list', params: {category: 1, type: 2}}" tag="div">
                        <el-menu-item index="1-2">CSS</el-menu-item>
                    </router-link>

                    <router-link :to="{name: 'list', params: {category: 1, type: 3}}" tag="div">
                        <el-menu-item index="1-3">JS</el-menu-item>
                    </router-link>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="fa fa-pie-chart"></i>
                    <span>后端</span>
                </template>
                    <router-link :to="{name: 'list', params: {category: 2, type: 1}}" tag="div">
                        <el-menu-item index="2-1">node</el-menu-item>
                    </router-link>

                    <router-link :to="{name: 'list', params: {category: 2, type: 2}}" tag="div">
                        <el-menu-item index="2-2">express</el-menu-item>
                    </router-link>

                    <router-link :to="{name: 'list', params: {category: 2, type: 3}}" tag="div">
                        <el-menu-item index="2-3">mongodb</el-menu-item>
                    </router-link>
            </el-submenu>
            <router-link to="/management/about" tag="div">
                <el-menu-item index="3">
                    <i class="fa fa-user"></i>
                    <span slot="title">关于我</span>
                </el-menu-item>
            </router-link>

            <router-link to="/management/edit" tag="div" v-if="menuShow">
                <el-menu-item index="4" @click="clearId">
                    <i class="fa fa-pencil-square-o"></i>
                    <span slot="title">编辑</span>
                </el-menu-item>
            </router-link>

        </el-menu>
    </el-container>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
export default {
    name: 'Aside',
    computed: {
        ...mapState(['menuShow'])
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        clearId(){
            console.log('清理')
            let _id = ''
            this.changeId({_id})
        },
        ...mapMutations(['changeId'])
    }
}
</script>

<style>
@import "../assets/css/aside.scss";
</style>
