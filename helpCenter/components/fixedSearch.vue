<template>
    <div class="fixed-search-box-wrapper">
        <div class="fixed-search-box">
            <div class="title">
                <span>族蚂</span>
                <span class="line"></span>
                <span>帮助中心</span>
            </div>
            <div class="search-box-wrapper">
                <!-- <input type="text" placeholder="请输入你想了解的问题" class="search-input">
                <span class="searchIcon iconfont icon-sousuo"></span> -->
                <search-box></search-box>
            </div>
        </div>
    </div>
</template>

<script>
import searchBox from './searchBox.vue';
export default {
    name: '',

    data () {
        return {
            
        }
    },
    components:{
        searchBox
    },

    methods: {},
    beforeCreate:function(){},
    created:function(){},
    mounted:function(){},
}
</script>

<style scoped lang="less">
    .fixed-search-box-wrapper{
        width:100%;
        height: 58px;
        position:fixed;
        z-index:1;
        top:0;
        background-color: #fff;
        .fixed-search-box{
            width: 1200px;
            height:100%;
            margin:0 auto;
            // background-color: yellowgreen;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .title{
                margin-left:70px;
                width:auto;
                height:100%;
                display: flex;
                align-items: center;
                span{
                    color:#606060;
                    font-size:20px;
                    &:nth-child(1){
                        font-weight:bold;
                    }
                    &.line{
                        display: inline-block;
                        width: 2px;
                        height: 20px;
                        background-color: #606060;
                        margin:3px 7px 0 7px;
                    }
                }
            }
        }
    }
</style>
