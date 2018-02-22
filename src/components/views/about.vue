<template>
    <div>
        <div class="ql-editor" v-html="doc">
            
        </div>
        <el-button type="primary" @click="editThis" v-if="menuShow">编辑<i class="el-icon-edit el-icon--right"></i></el-button>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'About',
    data (){
        return{
            doc: ''
        }
    },
    mounted: function(){
        let _this = this
        this.$ajax.post('/api/aboutMe',{category:3})
        .then(function(res){
            console.log(res.data.msg)
            _this.doc = res.data.msg[0].doc
        })
        .catch(function(err){
            console.log(err)
        })
    },
    computed: {
        ...mapState(['menuShow'])
    }
}
</script>

<style>

</style>
