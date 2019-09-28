<template>
    <div class="all-question-wrapper">
        <div class="headTitle">
            <span class="text">全部问题</span>
        </div>
         <div class="hot-question-list">
            <question-list :paginationInfo="paginationInfo" :dataList="curPageQuestionsList" @changePage="upDatePageData"></question-list>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import questionList from './questionList.vue'
export default {
    props:{
        curPageQuestionsList:Array,
        totalCounts:Number,   //总问题数
    },
    data () {
        return {
            pageSize:10, //每页显示的数据条数
            totalPageNums:1, //总页码数
            curPageNum:1,
        }
    },
    computed:{
        paginationInfo(){
            return {
                pageSize:this.pageSize,
                totalPageNums:this.totalPageNums,
                curPageNum:this.curPageNum
            }
        }
    },
    
    methods:{
       async upDatePageData(val){
            // val 是当前的页码数
            this.curPageNum = val;
            const res = await axios.get(`/help/queryHelpPage?iDisplayStart=${(val-1)*this.pageSize}&iDisplayLength=${this.pageSize}`)
            let data = res.data.data.helpContent.aaData;
            this.curPageQuestionsList.splice(0)
            this.curPageQuestionsList.push(...data)
        }
    },
    components:{
        questionList
    },
    created(){
        this.totalPageNums = Math.ceil(this.totalCounts/this.pageSize) || 1;
    }
}
</script>

<style scoped lang="less">
    .all-question-wrapper{
        position: relative;
        height: 100%;
        .headTitle{
            height: 106px;
            line-height: 106px;
            border-bottom: 1px solid #f2f2f2;
            span.text{
                font-size:24px;
                color:#303030;
            }
        }
        .question-list{
            ul{
                padding-top:20px;
                .question-title{
                    padding:20px 0;
                    font-size:16px;
                    color:#606060;
                    display: flex;
                    align-items: center;
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
