<template>
    <div style="width:100%">
        <div class="edit-select">
            <div class="edit-select-line">
                <el-select v-model="cValue" placeholder="请选择">
                    <el-option
                    v-for="item in category"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="sValue" :disabled="sDisabled" placeholder="请选择">
                    <el-option
                    v-for="item in smallClass"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <div class="edit-select-line">
                    <el-input v-model="title" placeholder="请输入标题"></el-input>
                </div>
            </div>
        </div>
        <quill-editor ref="myTextEditor" 
                      v-model="content" 
                      :options="editorOption" 
                      @blur="onEditorBlur($event)" 
                      @focus="onEditorFocus($event)" 
                      @ready="onEditorReady($event)">
        </quill-editor>
        <el-button type="info" @click="subWrite">提交</el-button>
        <!-- <div class="quill-code">
            <code class="hljs" v-html="contentCode"></code>
        </div> -->
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import { quillEditor } from 'vue-quill-editor' //调用编辑器
import hljs from 'highlight.js'
export default {
    data() {
        return {
            name: '01-example',
            content: `<h2 class="ql-align-center"><span class="ql-font-serif">Text content loading..</span></h2>`,
            editorOption: {
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'],
                        [{ 'header': 1 }, { 'header': 2 }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'script': 'sub' }, { 'script': 'super' }],
                        [{ 'indent': '-1' }, { 'indent': '+1' }],
                        [{ 'direction': 'rtl' }],
                        [{ 'size': ['small', false, 'large', 'huge'] }],
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        [{ 'font': [] }],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'align': [] }],
                        ['clean'],
                        ['link', 'image', 'video']
                    ],
                    syntax: {
                        highlight: text => hljs.highlightAuto(text).value
                    }
                }
            },
            category: [
                {
                    value: 1,
                    label: '前端'
                },
                {
                    value: 2,
                    label: '后端'
                },
                {
                    value: 3,
                    label: '关于我'
                }
            ],
            smallClass1: [
                {
                    value: 1,
                    label: 'HTML'
                },
                {
                    value: 2,
                    label: 'CSS'
                },
                {
                    value: 3,
                    label: 'JS'
                }
            ],
            smallClass2: [
                {
                    value: 1,
                    label: 'NODE'
                },
                {
                    value: 2,
                    label: 'EXPRESS'
                },
                {
                    value: 3,
                    label: 'JAVA'
                }
            ],
            cValue: '',
            sValue: '',
            title: '',
            sDisabled: false
        }
    },
    methods: {
        onEditorBlur(editor) {
            //console.log('editor blur!', editor)
            //console.log(this.content)
        },
        onEditorFocus(editor) {
            //console.log('editor focus!', editor)
        },
        onEditorReady(editor) {
            //console.log('editor ready!', editor)
        },
        subWrite(){
            //console.log(this.cValue+','+this.sValue+','+this.title+','+this.content)
            let date = new Date().Format("yyyy.MM.dd")
            let category = this.cValue
            let type = this.sValue
            let title = this.title
            let doc = this.content
            console.log(doc)
            if(this._id){//有id执行更新
                this.$ajax.post('/api/updateDoc', {
                    _id:this._id,
                    doc,
                    date
                })
                .then(function(res){
                    console.log(res.data)
                    if(res.data.flag == 0){
                        console.log('更新成功')
                    }
                })
                .catch(function(err){
                    console.log(err)
                })
            }else{//没有id执行提交
                if(category == '' || type == '' || title == '' || doc == ''){
                    alert('有未填选项')
                }else{
                    //提交
                    this.$ajax.post('/api/postWrite',{
                        title,
                        doc,
                        type,
                        category,
                        date
                    })
                    .then(function (res) {
                        console.log(res)
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
                }
            }
            
        }
    },
    computed: {
        editor() {
            return this.$refs.myTextEditor.quill
        },
        contentCode() {
            return hljs.highlightAuto(this.content).value
        },
        smallClass(){
            this.sDisabled = false
            if(this.cValue == 1){
                return this.smallClass1
            }else if(this.cValue == 2){
                return this.smallClass2
            }else if(this.cValue == 3){
                this.sDisabled = true
                this.sValue = 7//如果选择了关于我的类型，则把小类赋值为7
            }
        },
        ...mapState({
            _id: '_id'
        })
    },
    mounted() {
        //console.log('this is my editor', this.editor)
        console.log(this._id)
        let id = this._id
        let _this = this
        if(id){//如果有id就去请求该id的this.context
            this.$ajax.post('/api/note',{_id: id})
            .then(function(res){
                console.log(res.data.msg[0].doc)
                _this.content = res.data.msg[0].doc
            })
            .catch(function(err){
                console.log(err)
            })

        }else{//这里代表不是编辑已有的文章，直接清空content提交新文章到数据库
            this.content = ''
        }
        //this.content = `<h1 class="ql-align-center"><strong>关于我自己</strong><span class="ql-cursor"></span></h1>`
    }
}

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
</script>

<style>

</style>
