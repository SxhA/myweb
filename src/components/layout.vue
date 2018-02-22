<!--整体外层的大框架在这里，分为左侧导航栏、头部登录显示个人账户信息、主体内容区域-->
<template>
      
    <el-container class="layout-container">
        <el-aside>
            <h1 class="aside-title">我的小文档</h1>
            <Aside />
        </el-aside>
        <el-container>
            <el-header>
                <router-link to="/login" tag="span" class="login-btn">登录</router-link>
            </el-header>
            <el-main>
                <el-container>
                    <router-view></router-view>
                </el-container>
            </el-main>
        </el-container>
    </el-container>

</template>

<script>
import Aside from '@/components/aside'
export default {
    name: 'Layout',
    components: {
        Aside
    },
}
</script>

<style>

</style>
