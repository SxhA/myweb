<template>
    <div class="login-box">
        <form>
            <h1>Login Box</h1>
            <div>
                <input type="text" v-model="loginName" placeholder="用户名">
            </div>
            <div>
                <input type="text" v-model="loginPass" placeholder="密码">
            </div>
            <div class="btn-box">
                <el-button type="info" @click="loginHandle" @keyup.enter="loginHandle">登录</el-button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data (){
        return {
            loginName: null,
            loginPass: null
        }
    },
    methods: {
        loginHandle: function(){
            let that = this
            let loginName = this.loginName
            let loginPass = this.loginPass
            if(loginName == null || loginPass == null){
                alert('请填写完成信息')
            }else{
                this.$ajax.post('/api/login', {
                    'name': loginName,
                    'pass': loginPass
                })
                .then(function (res) {
                    console.log(res.data)
                    if(res.data.flag == 0 || res.data.flag == 1){//登录成功或已经登录
                        that.$store.commit('menuLogin', {menuShow: true})
                        that.$router.push('/')
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
            }
        }
    }
}
</script>

<style>

</style>
