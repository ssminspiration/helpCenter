<template>
    <div class="third-category-page-wrapper">
        <common-head :thirdCategoryList="thirdCategoryList" :secondCategoryTitle="selectedSecondCategoryTitle" :idData="idData"></common-head>
        <div class="hot-question-list">
            <question-list :paginationInfo="paginationInfo" :dataList="dataList" @changePage="upDatePageData"></question-list>
        </div>
    </div>
</template>

<script>
import commonHead from './thirdCategoryCommonHead.vue'
import questionList from './questionList.vue'
export default {
    name: '',
    props:{
        thirdCategoryList:Array,
        questionInfo:Object,
        selectedSecondCategoryTitle:String,
        idData:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data () {
        return {
            pageSize:10, //每页显示的数据条数
            totalPageNums:1, //总页码数
            curPageNum:1,  // 当前页码数
            dataList:[],
            seletedThirdCategoryIndex:-1,
          
            idUrl:"",
        }
    },
    computed:{
        paginationInfo(){
            return {
                pageSize:this.pageSize,
                totalPageNums:this.totalPageNums,
                curPageNum:this.curPageNum
            }
        },
        firstId(){
            return this.idData.firstId
        },
        secondId(){
            return this.idData.secondId
        },
        thirdId(){
            return this.idData.thirdId
        },
    },
    components:{
        questionList,
        commonHead
    },

    methods: {
        chooseThirdCategory(index){
            if(this.seletedThirdCategoryIndex == index) return;
            this.seletedThirdCategoryIndex = index
        },
        async upDatePageData(val){
            this.curPageNum = val;
            const res = await axios.get(`/help/queryHelpPage?${this.idUrl}&iDisplayStart=${(val-1)*this.pageSize}&iDisplayLength=${this.pageSize}`)
            let data = res.data.data.helpContent.aaData;
            this.dataList.splice(0)
            this.dataList.push(...data)
        }
    },
    beforeCreate:function(){},
    created:function(){
        if(process.client){
            this.totalPageNums = Math.ceil(this.questionInfo.count/this.pageSize) || 1;
            this.dataList = this.questionInfo.aaData || []
            if(this.thirdId){
                this.idUrl = `firstHcId=${this.firstId}&secondHcId=${this.secondId}&thirdHcId=${this.thirdId}`
            }else{
                this.idUrl = `firstHcId=${this.firstId}&secondHcId=${this.secondId}`;
            }
        }
    },
    mounted:function(){
        console.log('%c thirdCategory mounted','font-size:32px;color:orange',this.thirdCategoryList,this.questionInfo)
    },
}
</script>

<style scoped lang="less">
    .third-category-page-wrapper{
        position: relative;
        height: 100%;
    }
</style>
