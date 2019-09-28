<template>
    <div class="zm-help-center-sidebar">
        <div class="left-content-title">
            <img class="category-icon" src="/images/question-classify.png">
            <span class="question-classify">问题分类</span>
        </div>
        <div class="first-category-list-wrapper">
            <ul class="fisrt-category-list">
                <li v-for="(item,index) in newFirstCategoryList" :key="index + 'first'">
                    <div class="fisrt-category-list-info"  @click.stop.prevent="openSecondCategoryList(item,index)">
                        <span class="categoryTitle">{{item.fName}}</span>
                        <span class="up-down-arrow" :class="selectedFirstCategoryIndex == index? 'up-arrow' : 'down-arrow'"></span>
                    </div>
                    
                    <ul class="second-category-list" v-show="selectedFirstCategoryIndex == index">
                        <li v-for="(sItem,index) in item.secondCategoryList" :key="index + 'second'">
                            <nuxt-link :to="`/list-${item.fId}-${sItem.fId}`">
                            {{sItem.fName}}
                            </nuxt-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: '',
    props:{
        firstCategoryList:Array,
        selectedSecondCategoryList:Array,
        idData:{
            type:Object,
            default(){
                return {}
            }
        },  //类目id信息（包括一级，二级，三级类目Id）
    },
    data () {
        return {
            selectedFirstCategoryIndex:-1,
            newFirstCategoryList:[],       //处理后的数据
        }
    },
    computed:{
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
    methods: {
        async openSecondCategoryList(item,index){
            console.log('%c点击打开','font-size:44px;color:blue',item.secondCategoryList)

            if(this.selectedFirstCategoryIndex == index) this.selectedFirstCategoryIndex = -1
            else this.selectedFirstCategoryIndex = index;
            if(item.isRequestSecond) return 
            item.secondCategoryList = [];

            var res = await axios.get(`/help/queryChildCategorys?fParentId=${item.fId}`)   
            res = res.data.data;

            for(var i = 0; i < res.length; i++){
                var obj = {
                    fName:res[i].fName,
                    fId : res[i].fId,
                }
                item.secondCategoryList.push(obj)
            }
            item.isRequestSecond = true;
        }
    },
    beforeCreate:function(){},
    created:function(){
        if(process.client){
            for(let i = 0 ; i < this.firstCategoryList.length ; i++){
                var obj = {
                    fName:this.firstCategoryList[i].fName,
                    fId:this.firstCategoryList[i].fId,
                    secondCategoryList:[], //二级类目列表
                    isRequestSecond:false, //是否请求过二级类目   
                }
                if(this.firstCategoryList[i].fId == this.firstId) {
                    this.selectedFirstCategoryIndex = i;

                    this.selectedSecondCategoryList.forEach((item,index)=>{
                        var obj1 = {
                            fName:item.fName,
                            fId:item.fId
                        }
                        obj.secondCategoryList.push(obj1)
                    })
                }
                this.newFirstCategoryList.push(obj)
            }
        }
    },
    mounted:function(){
        console.log('%c一级类目','font-size:32px;color:red',this.firstCategoryList)
        console.log('%c二级类目','font-size:32px;color:blue',this.selectedSecondCategoryList,this.selectedFirstCategoryIndex,this.firstId)
    },
}
</script>

<style scoped lang="less">
    .zm-help-center-sidebar{
        .left-content-title{
            padding-left: 30px;
            height: 60px;
            border-bottom:solid 1px #f2f2f2;
            display: flex;
            align-items:center;
            .category-icon{
                display: inline-block;
                width: 18px;
                height: 18px;
            }
            .question-classify{
                font-size:18px;
                margin-left:10px;
            }
        }
        .first-category-list-wrapper{
            // overflow: hidden;
                .fisrt-category-list{
                padding: 0;
                // width:227px;
                // height:840px;
                height:auto;
                // max-height:840px;
                // overflow: hidden auto;
                // &::-webkit-scrollbar{
                //     display: none;
                // }
                li{
                    
                    .fisrt-category-list-info{
                        padding:0px 24px 0 30px;
                        height: 60px;
                        display:flex;
                        align-items: center;
                        justify-content: space-between;
                        font-size:14px;
                        color:#808080;
                        cursor: pointer;
                        
                        &:hover{
                            color:#3d9be9;
                            .up-down-arrow{
                                border-left-color:#3d9be9;
                                border-top-color:#3d9be9;
                            }
                        }
                        .categoryTitle{
                            overflow:hidden;
                            text-overflow: ellipsis;
                            white-space:nowrap;
                        }
                        .up-down-arrow{
                            display: inline-block;
                            width: 8px;
                            height: 8px;
                            border-left:solid 2px #ccc;
                            border-top:solid 2px #ccc;
                            transition:transform .2s;
                            &.up-arrow{
                                transform: translateY(4px) rotate(45deg);
                            }
                            &.down-arrow{
                                transform: translateY(-2px) rotate(225deg);
                            }
                        }
                    }

                    .second-category-list{
                        font-size:14px;
                        li{
                            height: 54px;
                            display:flex;
                            align-items:center;
                            background: #f9f9f9;
                            
                            a{
                                width: 100%;
                                height: 100%;
                                line-height: 54px;
                                padding: 0 22px 0 44px;
                                color:#505050;
                                overflow:hidden;
                                text-overflow: ellipsis;
                                white-space:nowrap;
                            }
                            &:hover{
                                cursor:pointer;
                                background-color: #e2f1ff;
                                border-right:solid 2px #3d9be9;
                                a{
                                    color:#3d9be9;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
