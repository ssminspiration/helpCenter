<template>
    <div class="search-box">
        <input type="text" placeholder="请输入你想了解的问题" class="search-input" ref="input" @keyup.enter="handleKeyup" :value="keywords">
        <span class="searchIcon iconfont icon-sousuo" @click.stop.prevent="handleSearch"></span>
    </div>
</template>

<script>
export default {
    name: '',

    data () {
        return {
        }
    },
    computed:{
        keywords(){
            return this.$store.state.keyWords;
        }
    },

    methods: {
        handleKeyup(e){
            e.target.blur()
            this.handleSearch(0)
        },
        handleSearch(){
            let keywords = this.$refs.input.value.trim();
            this.$store.commit('recordKeyWords',keywords)
            this.$router.push({path:`/bangzhu/${keywords}`})
        }
    },
    beforeCreate:function(){},
    created:function(){
        
    },
    mounted:function(){
        // let keyWords = this.$store.state.keyWords;
        // if(keyWords){
        //     this.$refs.input.value = keyWords;
        // }
    },
}
</script>

<style scoped lang="less">
    .search-box{
        width: 420px;
        height: 38px;
        line-height: 58px;
        border: 1px solid #ddd;
        background-color: #fff;
        border-radius:19px;
        margin-right:286px;
        padding:0 22px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .search-input{
            flex:1;                    
            height: 100%;
            border:none;
            outline: none;
        }
        .searchIcon{
            display: inline-block;
            width:20px;
            height:20px;
            line-height: 20px;
            text-align:center;
            font-size:28px;
            color:#999;
            cursor:pointer;
        }
    }
</style>
