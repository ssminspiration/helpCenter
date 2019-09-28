<template>
    <div class="zm-help-center-wrapper">
        <div class="zm-help-center-main">
            <div class="left-content">
                <sidebar :firstCategoryList="firstCategoryList"></sidebar>
            </div>
            <div class="right-content">
                <all-questions :curPageQuestionsList="curPageQuestions" :totalCounts="totalCounts"></all-questions>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import allQuestions from '~/components/allQuestions'
import thirdCategory from '~/components/thirdCategory'
import sidebar from '~/components/sidebar';

import requestUtil from '~/common/requestUtil';
export default {
    
    data(){
        return {
            
        }
    },
    components: {
      allQuestions,
      thirdCategory,
      sidebar
    },
    methods:{
      
    },

    mounted(){
        console.log('res',this.res)
    },

    async asyncData({store}){
        
        let {data:{data}} = await axios.get('/help/queryHelpByKeyword?iDisplayStart=0&iDisplayLength=10');

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

        const firstCategory = data.firstCategorys;
        const curPageQuestions = data.helpContent.aaData; //请求的对应的页码的问题数
        const counts = data.helpContent.count; //所有问题的条数

        return {
            firstCategoryList:firstCategory || [],
            curPageQuestions:curPageQuestions,
            totalCounts:counts
        }
      
    },

}
</script>

<style scoped>
    /* @import url(~/assets/main.css); */
</style>
