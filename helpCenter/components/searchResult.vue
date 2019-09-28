<template>
    <div class="search-content-detail-wrapper">
        <div class="search-word">
            搜索关键词：{{keyWords}}
        </div>
        <div class="search-content">
            <ul class="resultList">
                <li v-for="(item,index) in resultList" :key="index">
                    <div class="question-title">
                        <nuxt-link :to="`/detail/${item.fId}`" v-html="filterSearchKey(item.fTitle)"></nuxt-link>
                    </div>
                    <div class="question-content" v-html="filterSearchKey(item.fContent)"></div>
                </li>
            </ul>

            <div class="pagination-componet">
                <pagination :paginationInfo="paginationInfo" @changePage="upPageData"></pagination>
            </div>
        </div>
    </div>
</template>

<script>
import pagination from '~/components/pagination.vue'
export default {
    props:{
        resultList:Array,
        count:Number,
        keyWords:String
    },
    data () {
        return {
            pageSize:6, //每页显示的数据条数
            totalPageNums:1, //总页码数
            curPageNum:1,  // 当前页码数
        }
    },
    computed:{
        paginationInfo(){
            return {
                pageSize:this.pageSize,
                totalPageNums:this.totalPageNums,
                curPageNum:this.curPageNum
            }
        }
    },
    components:{
        pagination
    },

    methods: {
        upPageData(val){
            this.curPageNum = val
        },

        removeHTMLTag(str) {
            str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
            str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
            //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
            str = str.replace(/&nbsp;/ig, '');//去掉&nbsp;
            return str;
        },

        filterSearchKey: function (searchContent) {
            var searchKeyStr = this.keyWords.replace(/\*/g, '');

            /* var htmlLable = new RegExp('^<([^>\s]+)[^>]*>(.*?<\/\\1>)?$');//匹配是否是HTML标签*/
            /*console.log(htmlLable.test(searchContent))*/
            var HtmlUtil = {
                /*1.用浏览器内部转换器实现html转码*/
                htmlEncode: function (html) {
                    //1.首先动态创建一个容器标签元素，如DIV
                    var temp = document.createElement("div");
                    //2.然后将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
                    temp.textContent != undefined
                        ? (temp.textContent = html)
                        : (temp.innerText = html);
                    //3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
                    var output = temp.innerHTML;
                    temp = null;
                    return output;
                },
                /*2.用浏览器内部转换器实现html解码*/
                htmlDecode: function (text) {
                    //1.首先动态创建一个容器标签元素，如DIV
                    var temp = document.createElement("div");
                    //2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
                    temp.innerHTML = text;
                    //3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
                    var output = temp.innerText || temp.textContent;
                    temp = null;
                    return output;
                },
                /*3.用正则表达式实现html转码*/
                htmlEncodeByRegExp: function (str) {
                    var s = "";
                    if (str.length == 0) return "";
                    s = str.replace(/&/g, "&amp;");
                    s = s.replace(/<span/g, "&lt;");
                    s = s.replace(/<image/g, "&lt;");
                    s = s.replace(/>/g, "&gt;");
                    s = s.replace(/ /g, "&nbsp;");
                    s = s.replace(/\'/g, "&#39;");
                    s = s.replace(/\"/g, "&quot;");
                    return s;
                },
                /*4.用正则表达式实现html解码*/
                htmlDecodeByRegExp: function (str) {
                    var s = "";
                    if (str.length == 0) return "";
                    s = str.replace(/&amp;/g, "&");
                    s = s.replace(/&lt;/g, "<span");
                    s = s.replace(/&lt;/g, "<image");
                    s = s.replace(/&gt;/g, ">");
                    s = s.replace(/&nbsp;/g, " ");
                    s = s.replace(/&#39;/g, "'");
                    s = s.replace(/&quot;/g, '"');
                    return s;
                }
            };

            var searchReg = new RegExp(searchKeyStr, "ig");
            // console.log(searchReg);
            return this.removeHTMLTag(searchContent).replace(
                searchReg,
                '<span class="key-word" style="color:red">' + searchKeyStr + "</span>"
            );
        },

    },
    beforeCreate:function(){},
    created:function(){},
    mounted:function(){
        this.totalPageNums = Math.ceil(this.count/this.pageSize) || 1;
    },
}
</script>

<style scoped lang="less">
    .search-content-detail-wrapper{
        height:100%;
        position:relative;
        .search-word{
            height: 105px;
            border-bottom: 1px solid #e8e8e8;
            font-size:24px;
            // font-weight:bold;
            padding:40px 0;
            color:#303030;
        }

        .search-content{
            padding-top: 25px;
            .resultList{
                padding-right: 85px;
                li{
                    padding:14px 0;
                    // margin-bottom: 10px;
                    .question-title{
                        font-size:18px;
                        padding-bottom: 10px;
                        a{
                            color:#3d9be9;
                        }
                    }
                    .question-content{
                        font-size:12px;
                        line-height: 22px;
                        height:44px;
                        color:#666;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        word-break: break-all;
                        text-overflow:ellipsis;
                    }
                }
            }

            .pagination-componet{
                position:absolute;
                bottom:80px;
            }
        }
    }
</style>
