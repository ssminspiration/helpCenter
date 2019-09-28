<template>
    <div class="head-content">
        <div class="second-category-title">{{secondCategoryTitle}}</div>
        <div class="third-category-list">
            <ul>
                <li class="third-category-title" :class="{active:seletedThirdCategoryIndex=='all'}">
                    <nuxt-link :to="`/list-${firstId}-${secondId}`">全部</nuxt-link>
                </li>
                <li class="third-category-title" :class="{active:seletedThirdCategoryIndex==index}" v-for="(item,index) in thirdCategoryList" :key="index" @click.stop.prevent="chooseThirdCategory(index)">
                    <nuxt-link :to="`/list-${firstId}-${secondId}-${item.fId}`">{{item.fName}}</nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    props:{
        thirdCategoryList:Array,
        secondCategoryTitle:String,
        idData:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data () {
        return {
            seletedThirdCategoryIndex:null,
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
        chooseThirdCategory(index){
            if(this.seletedThirdCategoryIndex == index) return;
            this.seletedThirdCategoryIndex = index
        }
    },
    mounted:function(){
        if(!this.thirdId) {
            return this.seletedThirdCategoryIndex = 'all';
        }
       
        this.seletedThirdCategoryIndex = this.thirdCategoryList.findIndex((item,index) => 
            item.fId == this.thirdId
        )
    },
}
</script>

<style scoped lang="less">
    .head-content{
        height:auto;
        border-bottom: 1px solid #e8e8e8;
        padding-top:32px;
        // padding-bottom:6px;
        .second-category-title{
            margin-bottom:30px;
            font-size:24px;
            color:#303030;
        }
        .third-category-list{
            ul{
                display: flex;
                flex-wrap:wrap;
                .third-category-title{
                    height: 36px;
                    line-height: 36px;
                    text-align:center;
                    border-radius:18px;
                    font-size:14px;
                    margin-right:40px;
                    margin-bottom: 14px;
                    cursor:pointer;
                    // transition:all 0.5;
                    a{
                        color:#606060;
                    }
                    &:hover{
                        color:#3d9be9;
                    }
                    &.active{
                        a{
                            color:#fff;
                        }
                        
                        background-color: #3d9be9;
                        padding:0 30px;
                    }
                }
            }
            
        }
    }
</style>
