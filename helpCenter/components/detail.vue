<template>
    <div class="hotQuestion-detail-wrapper">
        <common-head :thirdCategoryList="thirdCategoryList" :secondCategoryTitle="selectedSecondCategoryTitle" :idData="idData"></common-head>
        <div class="question-detail-content">
            <div v-html="detailContent"></div>
        </div>
    </div>
</template>

<script>
import commonHead from './thirdCategoryCommonHead'
export default {
    props:{
        thirdCategoryList:Array,
        selectedSecondCategoryTitle:String,
        detailContent:String,
        idData:{
            type:Object,
            default(){
                return {}
            }
        }
    },

    data () {
        return {
            
        }
    },
    components:{
        commonHead
    },

    methods: {},
    beforeCreate:function(){},
    created:function(){},
    mounted:function(){},
}
</script>

<style scoped lang="less">
    .question-detail-content{
        padding-top: 40px;
        padding-right: 48px;
        word-break:break-all;
        /deep/ img{
            width: 360px;
        }
    }
</style>
