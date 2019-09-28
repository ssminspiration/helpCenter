<template>
    <div>
        <div class="zm-help-center-head">
            <div class="ecommerce-wrapper">
                <ecommerce></ecommerce>
            </div>
            <banner></banner>
        </div>

        <transition name="fade">
            <fixed-search v-show="isShow"></fixed-search>
        </transition>
        
        <nuxt></nuxt>

        <zm-footer :wwwDomain="wwwDomain" helpDomain="helpDomain"></zm-footer>
    </div>
    
</template>


<script>
import ecommerce from '~/components/header/ecommerce.vue'
import banner from '~/components/banner.vue';
import fixedSearch from '~/components/fixedSearch.vue';
import zmFooter from '~/components/footer/zmFooter.vue'
export default {
    data(){
        return {
           scrollTop:0,
        }
    },
    computed:{
        isShow(){
            if(this.scrollTop >= 120) return true
            else return false;
        },
        wwwDomain(){
            return this.$store.state.wwwDomain
        },
        helpDomain(){
            return this.$store.state.helpDomain
        }
    },
    components:{
        ecommerce,
        banner,
        fixedSearch,
        zmFooter
    },
    created(){
        // console.log('%c layout created','font-size:32px;color:orange')
        if(process.client){
            // console.log('%c 客户端','font-size:32px;color:blue',window)
            document.onscroll = (e)=>{
                // console.log('%c 页面滚动','font-size:32px;color:pink',document.documentElement.scrollTop)
                this.scrollTop = document.documentElement.scrollTop
            }
        }else{
            console.log('%c 服务端','font-size:32px;color:blue')
        }
    },
    mounted(){
        // console.log('%c layout mounted','font-size:32px;color:green')
    }
}
</script>

<style >
    html {
        font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
            Roboto, 'Helvetica Neue', Arial, sans-serif;
        font-size: 16px;
        word-spacing: 1px;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
    }

    *,
    *:before,
    *:after {
    box-sizing: border-box;
        margin: 0;
    }

    
</style>


<style scoped lang="less">
        .ecommerce-wrapper{
            height: 30px;
            background-color: #f2f2f2;
        }

        .fade-enter-active,.fade-leave-active{
            transition: opacity 0.5s;
        }
        .fade-enter,.fade-leave-to{
            opacity:0;
        }
       
</style>
