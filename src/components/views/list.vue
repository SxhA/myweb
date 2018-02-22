<template>
    <div class="list-box">
        <ul>
            <!-- <li>
                <span>1:</span>
                <router-link to="xxxxx" tag="span" class="list-link">javascript的终极用途</router-link>
                <span>(2018.1.2)</span>
            </li>-->
            <li v-for="(item, index) in titleList" :key="item.id">
                <span>{{index+1}}:</span>
                <router-link :to="{name: 'note', params: {id: item._id}}" tag="span" class="list-link">{{item.title}}</router-link>
                <span>({{ item.time }})</span>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    name: 'List',
    props: ['category','type'],
    data (){
        return {
            
        }
    },
    computed: {
        ...mapState({
            titleList: 'titleList'
        })
    },
    methods: {
        ...mapActions({
            changeList: 'titleList'
        }),
        list(){
            this.changeList({category:this.category, type:this.type})
        }
    },
    created: function(){
        this.list()
    },
    watch: {
        category: function(){
            this.list()
        },
        type: function(){
            this.list()
        }
    }
}
</script>

<style>

</style>
