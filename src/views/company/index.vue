<template>
  <CustomRefresh ref="customRefresh" class="refresh-container" id="refresh-container" @refresh="refresh">
    <view class="content">
        <div class="card"></div>
        <div class="header"></div>
        <div class="table-info" id="table-info">
            <view class="" v-for="item in 1000">
                <view class="fixed-header" id="fixed-header" v-if="item ===1">
                     <view class="row" id="row-header">
                        <view class="title title-header"> 测试 {{ item }}</view>
                        <view class="desc">asfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfddfdfdfdfdfdfdfdfdfdfdfdfdfdfdfddfdfdfdfdfdfdfdfdfdfd</view>
                    </view>
                </view>
                <view class="row" v-else>
                    <view class="title">  测试 {{ item }}</view>
                    <view class="desc">asfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfddfdfdfdfdfdfdfdfdfdfdfdfdfdfdfddfdfdfdfdfdfdfdfdfdfd</view>
                </view>
            </view>
        </div>
    </view>
  </CustomRefresh>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import CustomRefresh from './components/CustomRefresh.vue'
import { nextTick } from 'process';
import { pxValueToPx } from '@/utils/tools';
const customRefresh = ref<InstanceType<typeof CustomRefresh>>(); // 定义子组件实例
const refresh = () => {
  console.log('下拉刷新')
}
const scrollTop = ref<number>(0);
// 整体方向上的垂直滚动
const handleVerticalScroll = (e:any) => {
    console.log(e.target.scrollTop)
    scrollTop.value = e.target.scrollTop;
    if(!row_header_node.value || !table_info_node.value) return;
    if(scrollTop.value >= Number(pxValueToPx(200,false))){
        row_header_node.value.style.position = "fixed";
        row_header_node.value.scrollLeft = table_info_node.value.scrollLeft;
        row_header_node.value.style.top = pxValueToPx(100) as string;
        row_header_node.value.style.overflow = "scroll";
    }else{
        row_header_node.value.style.position = "static";
        row_header_node.value.style.top = "0";
        row_header_node.value.style.overflow = "visible";
    }
}
// 表头方向水平方向滚动
const handleHeaderHorizontalScroll = (e:any) => {
    const scrollLeft = e.target.scrollLeft;
    if(!row_header_node.value || !table_info_node.value  || isTouchingEl.value === 'body') return;
    if(row_header_node.value.style.position === "fixed"){
        console.log("表头方向移动",scrollLeft)
        table_info_node.value.scrollLeft = scrollLeft;
    }
}
// 表格方向的水平滚动
const handleTableHorizontalScroll = (e:any) => {
    const scrollLeft = e.target.scrollLeft;
    if(!row_header_node.value || isTouchingEl.value === 'header') return;
    if(row_header_node.value.style.position === "fixed"){
        console.log("表格方向移动",scrollLeft)
        row_header_node.value.scrollLeft = scrollLeft;
    }
}
// 正在触摸的容器
const isTouchingEl = ref<string>("");
const handleTouchStart = (tag:string) => {
    isTouchingEl.value = tag;
}

// 初始化
const container_node = ref<HTMLElement>(); //垂直方向的容器
const row_header_node = ref<HTMLElement>(); //表头容器  
const table_info_node = ref<HTMLElement>(); //表格容器
onMounted(()=>{
    nextTick(()=>{
        container_node.value = document.getElementById("refresh-container")  as HTMLElement;
        row_header_node.value = document.getElementById("fixed-header")  as HTMLElement;
        table_info_node.value = document.getElementById("table-info")  as HTMLElement;
        console.log("🚀 ~ row_header_node.value:", row_header_node.value)
        if(!container_node.value || !row_header_node.value || !table_info_node.value) return;
        container_node.value.addEventListener("scroll", handleVerticalScroll);
        row_header_node.value.addEventListener("scroll", handleHeaderHorizontalScroll);
        row_header_node.value.addEventListener("touchstart", () => handleTouchStart("header"), true);
        table_info_node.value.addEventListener("scroll", handleTableHorizontalScroll);
        table_info_node.value.addEventListener("touchstart", ()=>handleTouchStart("body"), true);
    })
})
// 卸载
onUnmounted(() => {
    if(!container_node.value || !row_header_node.value || !table_info_node.value) return;
    container_node.value.removeEventListener("scroll", handleVerticalScroll);
    row_header_node.value.removeEventListener("scroll", handleHeaderHorizontalScroll);
    row_header_node.value.removeEventListener("touchstart", () => handleTouchStart("header"), true);
    table_info_node.value.removeEventListener("scroll", handleTableHorizontalScroll);
    table_info_node.value.removeEventListener("touchstart", ()=>handleTouchStart("body"), true);
})

</script>
<style scoped lang="scss">
*::-webkit-scrollbar {
  display: none;
  width: 0 !important;
}

*::-webkit-scrollbar-thumb {
  background: transparent;
  width: 0 !important;
}
  .refresh-container {
    background: var(框架2, rgba(11, 36, 77, 1));
    .content{
        .card{
            width: 100vw;
            height: 200rpx;
            background-color: red;
        }
        .header{
            width: 100vw;
            height: 100rpx;
            background-color: yellow;
            position: sticky;
            top: 0;
            z-index: 99;
        }
        .table-info{
            width: 100vw;
            overflow: auto hidden;
            .fixed-header{
                width: 100vw;
            }
            #row-header{
                position: static;
                display: flex;
                background-color: red !important;
            }
            .row{
                width: 2000rpx;
                height: 50rpx;
                border: 1rpx solid red;
                box-sizing: border-box;
                display: flex;
                .title-header{
                    z-index: 999;
                    background-color: red;
                }
                .title{
                    font-size: 30rpx;
                    color: gray;
                    width: 150rpx;
                    border: 1px solid green;
                    position: sticky;
                    left: 0;
                }
                .desc{
                    font-size: 30rpx;
                    color: gray;
                    width: 150rpx;
                    border: 1px solid green;
                    flex: 1;
                }
            }
        }
    }
  }
</style>