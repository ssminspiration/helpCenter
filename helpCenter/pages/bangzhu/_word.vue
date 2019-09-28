<template>
    <div class="zm-help-center-wrapper">
        <div class="zm-help-center-main">
            <!-- <div class="left-content">
                <sidebar :firstCategoryList="firstCategoryList"></sidebar>
            </div> -->
            <div class="content-detail">
               <!-- <h1>list page</h1> -->
               <search-result :count="count" :resultList="resultList" :keyWords="keyWords"></search-result>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import sidebar from '~/components/sidebar.vue';
import searchResult from '~/components/searchResult.vue';
import requestUtil from '~/common/requestUtil';

export default {
    name: '',

    data () {
        return {
        }
    },
    computed:{
        count(){
            return this.helpContent.count;
        },
        resultList(){
            return this.helpContent.aaData;
        }
    },
    components:{
        sidebar,
        searchResult
    },

    methods: {},
    beforeCreate:function(){},
    created:function(){},
    mounted:function(){
        console.log('%c 搜索结果页','font-size:32px;color:green;font-weight:bold',this.helpContent)
    },
    async asyncData({params,store}){
       
        var keyWords = encodeURI(params.word)
        var {data:{data}} = await axios.get(`/help/queryHelpByKeyword?keyWords=${keyWords}&iDisplayStart=0&iDisplayLength=10`)

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
        store.commit('recordKeyWords',params.word)

        return {
            firstCategoryList:data.firstCategorys,
            helpContent:data.helpContent,
            keyWords:params.word
        }
    }
}
</script>

<style scoped lang="less">
    .content-detail{
        // min-height:900px;
        height:900px;
        background-color: #fff;
        padding-left:44px;
    }
</style>
