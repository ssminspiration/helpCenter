<template>
    <div class="zm-help-center-wrapper">
        <div class="zm-help-center-main">
            <div class="left-content">
                <sidebar :firstCategoryList="firstCategoryList" :selectedSecondCategoryList="secondCategoryList" :idData="idData"></sidebar>
            </div>
            <div class="right-content detail">
               <detail :thirdCategoryList="thirdCategoryList" :selectedSecondCategoryTitle="selectedSecondCategoryTitle" :detailContent="content" :idData="idData"></detail>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import sidebar from '~/components/sidebar.vue'
import detail from '~/components/detail.vue';
import requestUtil from '~/common/requestUtil';
export default {
    name: '',

    data () {
        return {
           selectedSecondCategoryTitle:"",
           content:""
        }
    },
    components:{
        sidebar,
        detail
    },
    computed:{
        idData(){
            return {
                firstId:this.helpBean.firstHcId,
                secondId:this.helpBean.secondHcId,
                thirdId:this.helpBean.thirdHcId,
            }
        }
    },

    methods: {},
    beforeCreate:function(){},
    created:function(){
        this.content = this.helpBean.fContent;
        this.selectedSecondCategoryTitle = this.helpBean.secondHcName;
    },
    mounted:function(){
        console.log('%c热点问题详情数据','font-size:38px;color:purple',this.dataObj)
    },
   
    async asyncData({params,store}){
        var id = params.id;
        var {data:{data}} = await axios.get(`/help/getMapCategorysAndHelp?fId=${id}`);

        let hostUrl = requestUtil.validateData(await requestUtil.getData('/shop_web/shopInfo/getCurrentDomain', null));
        let wwwDomain = hostUrl.rootPath;
        let helpDomain = null;
        if(wwwDomain.indexOf("dev") !== -1){
            helpDomain = "http://help.dev-zuma.com";
        }else if(wwwDomain.indexOf("pre") !== -1){
            helpDomain = "https://help.pre-zuma.com";
        }else{
            helpDomain = "https://help.zuma.com";
        }

        store.commit('changeWWWDomain',wwwDomain)
        store.commit('changeHelpDomain',helpDomain)


        return {
            dataObj:data,
            firstCategoryList:data.firstCategorys,
            secondCategoryList:data.secondCategorys,
            thirdCategoryList:data.threeCategorys,
            helpBean:data.helpBean,  //详情内容数据
        }
    }
}
</script>

<style scoped>
    .right-content.detail{
        height:auto;
        min-height:900px;
    }
</style>
