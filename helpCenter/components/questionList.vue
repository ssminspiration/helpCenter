<template>
    <div class="question-list-wrapper">
        <div class="question-list">
            <ul>
                <li class="question-title" v-for="(question,index) in dataList" :key="index">
                    <span class="circle"></span>
                    <!-- <span>{{question.fTitle}}</span> -->
                    <nuxt-link :to="`/detail/${question.fId}`">{{question.fTitle}}</nuxt-link>
                </li>
            </ul>
        </div>
        <div class="question-pagination">
            <pagination @changePage="changePage" :paginationInfo="paginationInfo"></pagination>
        </div>
    </div>
</template>

<script>
import pagination from './pagination.vue'
export default {
    props:{
        paginationInfo:Object,
        dataList:Array
    },
    data() {
        return {
        }
    },

    
    components:{
        pagination
    },

    methods: {
        changePage(val){
            this.$emit('changePage',val)
        }
    },
    mounted(){
        console.log('%c问题列表','font-size:28px;color:red',this.dataList)
    }
    
}
</script>

<style scoped lang="less">
    .question-list-wrapper{
        .question-list{
            ul{
                padding-top:18px;
                .question-title{
                    padding:16px 0;
                    font-size:16px;
                    display: flex;
                    align-items: center;
                    a{
                        color:#606060;
                    }
                    .circle{
                        display: inline-block;
                        width: 6px;
                        height: 6px;
                        background-color: #606060;
                        border-radius:50%;
                        margin-right:10px;
                    }
                }
            }
            
        }

        .question-pagination{
            position:absolute;
            bottom: 80px;
        }
    }
</style>

