<template>
    <div style="width:100%;">
        <div class="ql-editor" v-html="doc">
        
        </div>
        <div>
            <el-button type="primary" @click="editThis" v-if="menuShow">编辑<i class="el-icon-edit el-icon--right"></i></el-button>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'Note',
    props:['id'],
    data (){
        return{
            
        }
    },
    computed: {
        ...mapState({
            doc: 'doc',
            menuShow: 'menuShow'
        })
    },
    methods: {
        ...mapActions({
            changeDoc: 'actNote'
        }),
        note(){
            this.changeDoc({_id: this.id})
        },
        editThis(){
            this.$router.push({ path: '/management/edit' })
        }
    },
    created: function(){
        this.note()
    }
}
</script>

<style>

</style>
