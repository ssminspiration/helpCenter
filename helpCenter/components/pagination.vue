<template>
    <div class="pagination-component-wrapper">
        <ul class="pagination-ul" v-if="normal">
            <li class="prePage" :class="{disableStyle:disablePre}" @click.stop.prevent="changeToPrePage">
                <span class="left-arrow"></span>
            </li>
            <li  v-for="(page,index) in curPageList" :key="index" :class="{curSelected:selftCurPageNum == page}" @click.stop.prevent="changeToCurPage(page,index)">{{page}}</li>
            <li class="nextPage" :class="{disableStyle:disableNext}" @click.stop.prevent="changeToNextPage">
                <span class="right-arrow"></span>
            </li>
        </ul>
        

        <ul class="pagination-ul" v-else>
            <li class="prePage" :class="{disableStyle:disablePre}" @click.stop.prevent="changeToPrePage">
                <span class="left-arrow"></span>
            </li>

            <li  v-for="(page,index) in curPageList" :key="index" :class="{curSelected:selftCurPageNum == page}" @click.stop.prevent="changeToCurPage(page,index)">{{page}}</li>

            <li class="ellipsis" v-if="isShowEllipsis">
                <span></span>
                <span></span>
                <span></span>
            </li>
            <li class="lastPage" :class="{curSelected:selftCurPageNum == pageSize}" @click.stop.prevent="changeToCurPage(pageSize)">{{pageSize}}</li>

            <li class="nextPage" :class="{disableStyle:disableNext}" @click.stop.prevent="changeToNextPage">
                <span class="right-arrow"></span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'pagination',
    props:{
        paginationInfo:Object
    },
    data () {
        return {
           disablePre:true,
           disableNext:false,
           normal:true,
           curPageList:[],
           isShowEllipsis:true, //是否显示省略号
           len:5,
           selftCurPageNum:1
        }
    },
    computed:{
        pageSize(){
            return this.paginationInfo.pageSize
        },
        totalPageNums(){
            return this.paginationInfo.totalPageNums
        },
        curPageNum(){
            return this.paginationInfo.curPageNum
        },
    },
    methods: {
        changeToPrePage(){
            console.log('当前页码',this.selftCurPageNum)
            if(this.selftCurPageNum == 1) return;
            this.selftCurPageNum--;
            let tempArr = [];
            
            if(this.selftCurPageNum < this.curPageList[0]){
                tempArr = this.curPageList.splice(0)
                tempArr.forEach((item)=>{
                    this.curPageList.push(item-1)
                })
            }

            if(this.curPageList[this.len-1] + 1 < this.totalPageNums){
                this.isShowEllipsis = true;
            }

            if(this.selftCurPageNum == 1) {
                this.disableNext = false;
                this.disablePre = true;
            }else{
                this.disableNext = false;
                this.disablePre = false;
            }

            this.$emit('changePage',this.selftCurPageNum)

        },
        changeToNextPage(){
            console.log('当前页码',this.selftCurPageNum,this.totalPageNums)
            if(this.selftCurPageNum == this.totalPageNums) return;
            this.selftCurPageNum++;
            let tempArr = [];

            if(this.selftCurPageNum != this.totalPageNums && this.selftCurPageNum > this.curPageList[this.len - 1]){
                tempArr = this.curPageList.splice(0)
                tempArr.forEach((item)=>{
                    this.curPageList.push(item+1)
                })
            }

            if(this.curPageList[this.len-1] + 1 == this.totalPageNums){
                this.isShowEllipsis = false;
            }


            if(this.selftCurPageNum == this.totalPageNums) {
                this.disableNext = true;
                this.disablePre = false;
            }else{
                this.disableNext = false;
                this.disablePre = false;
            }

            this.$emit('changePage',this.selftCurPageNum)
        },

        // 切换到具体的某一页
        changeToCurPage(page,index){
            if(page == this.selftCurPageNum) return;
            this.selftCurPageNum = page;
            if(page === 1){
                this.disablePre = true;
                this.disableNext = false;
            }else if(page == this.totalPageNums){
                this.disablePre = false;
                this.disableNext = true;
            }else{
                this.disablePre = false;
                this.disableNext = false;
            }

            this.$emit('changePage',this.selftCurPageNum)
        }
    },
    created:function(){
        if(this.totalPageNums >=  7){
            this.normal = false;
            this.curPageList.push(1,2,3,4,5)
        }else{
            for(var i = 1; i <= this.totalPageNums; i++){
                 this.curPageList.push(i)
            }
        }
       
        if(this.totalPageNums == 1){
            this.disablePre = true;
            this.disableNext = true;
        }

        this.selftCurPageNum = this.curPageNum
    },
    mounted(){
        console.log(this.paginationInfo,'mmmmmmmmmmmmm')
    }
   
}
</script>

<style scoped lang="less">
    .pagination-ul{
        display: flex;

        li{
            width: 32px;
            height: 32px;
            line-height: 32px;
            border-radius:4px;
            border:solid 1px #dbdbdb;
            margin:0 8px;
            text-align:center;
            cursor: pointer;
            font-size:14px;
            &.curSelected{
                border:solid 1px #3d9be9;
                color:#3d9be9
            }
            &.ellipsis{
                border:none;
                cursor:defalut;
                span{
                    display: inline-block;
                    width: 4px;
                    height: 4px;
                    border-radius:50%;
                    background-color: #bfbfbf;
                }
            }
            &.disableStyle{
                 cursor: default;
                 &.prePage span,&.nextPage span{
                    border-left:solid 2px #c4c4c4;
                    border-top:solid 2px #c4c4c4;
                 }
            }
            &.prePage span,&.nextPage span{
                display: inline-block;
                width: 8px;
                height: 8px;
                border-left:solid 2px #979797;
                border-top:solid 2px #979797;
                
                &.left-arrow{
                    transform: translateY(-2px) rotate(-45deg)
                }
                &.right-arrow{
                    transform: translateY(-2px) rotate(135deg)
                }
            } 
            
        }
    }
</style>
