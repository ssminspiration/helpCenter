<template>
    <div class="zm-help-center-wrapper">
        <div class="zm-help-center-main">
            <div class="left-content">
                <sidebar :firstCategoryList="firstCategorys" :selectedSecondCategoryList="secondCategorys" :idData="idData"></sidebar>
            </div>
            <div class="right-content">
               <third-category :thirdCategoryList="thirdCategorys" :questionInfo="hotQuestions" :selectedSecondCategoryTitle="selectedSecondCategoryTitle" :idData="idData"></third-category>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import sidebar from '~/components/sidebar.vue';
import thirdCategory from '~/components/thirdCategory';
import requestUtil from '~/common/requestUtil';
export default {
    name: '',
    data () {
        return {
            selectedSecondCategoryTitle:"",
        }
    },
    components:{
        sidebar,
        thirdCategory
    },
    computed:{
        idData(){
            return {
                firstId:this.firstId,
                secondId:this.secondId,
                thirdId:this.thirdId
            }
        }
    },

    methods: {

    },
    beforeCreate:function(){},
    created:function(){
        if(process.client){
           var secondCategory =  this.secondCategorys.find((item)=>{
                return item.fId == this.secondId
            })
            this.selectedSecondCategoryTitle = secondCategory.fName
        }
    },
    mounted:function(){
        console.log('%clist mounted','font-size:32px;color:green',this.hotQuestions)
    },
    async asyncData({params,route,store}){
       
        let idArr = params.list.split("-").splice(1);
        const firstId = idArr[0];
        const secondId = idArr[1];
        const thirdId = idArr[2];
        
        let queryId;
        if(thirdId){
            // 三级类目id存在,即选中了三级类目
            queryId = `firstHcId=${firstId}&secondHcId=${secondId}&thirdHcId=${thirdId}`
        }else{
            // 没有选中三级类目，默认显示该二级类目下的所有热点问题
            queryId = `firstHcId=${firstId}&secondHcId=${secondId}`
        }
        let {data:{data}} = await axios.get(`/help/getMapCategorysAndHelp?${queryId}&iDisplayStart=0&iDisplayLength=10`);

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


        const firstCategorys = data.firstCategorys;
        const secondCategorys = data.secondCategorys;
        const thirdCategorys = data.threeCategorys;
        const hotQuestions = data.helpContent;
        
        return {
            firstCategorys:firstCategorys || [],
            secondCategorys:secondCategorys || [],
            thirdCategorys:thirdCategorys || [],
            hotQuestions:hotQuestions || [],
            firstId:firstId,
            secondId:secondId,
            thirdId:thirdId,
            listData:data
        }
    }
}
</script>

<style scoped>

</style>
