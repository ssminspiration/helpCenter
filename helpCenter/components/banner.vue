<template>
    <div class="help-center-banner-wrapper">
        <div class="help-center-banner">
            <div class="content">
                <div class="title">
                    <span>族蚂</span>
                    <span class="line"></span>
                    <span>帮助中心</span>
                </div>
                <div class="search-box-wrapper">
                    <!-- <span class="iconfont icon-sousuo"></span> -->
                    <search-box></search-box>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import searchBox from './searchBox';
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
    .help-center-banner-wrapper{
        width: 100%;
        height: 200px;
        background-image: url("/images/helpBanner.png");
        margin-bottom:35px;
        .help-center-banner{
            height:100%;
            width: 1200px;
            margin:0 auto;
            position:relative;
            .content{
                width: 420px;
                height: 100%;
                position: absolute;
                right:286px;
                .title{
                    width:100%;
                    display: flex;
                    justify-content: center;
                    align-items:center;
                    margin: 55px 0 20px 0;
                    span{
                        display: inline-block;
                        font-size:28px;
                        color:#fff;
                        &:nth-child(1){
                            font-weight:bold;
                        }
                        &.line{
                            width: 2px;
                            height: 32px;
                            box-shadow:1px 0px 2px #fff;
                            background-color: #fff;
                            margin:0 20px;
                        }
                    }
                    
                }

                .search{
                    width: 420px;
                    height: 44px;
                    // border: solid 2px #ccc;
                    border-radius:22px;
                    background-color: #fff;
                }
            }
        }
    }
</style>
