<!-- 下拉刷新组件,适用于全屏下拉刷新，不适用内容区域内有一块单独（上下）滚动的区域(指的是不能再设置一个单独的垂直方向的滚动容器，如果需要垂直方向的滚动，直接依我这个壳子来进行滚动就行)-->
 <!-- 内容通过插槽传入，父组件接收refresh然后调用需要刷新的接口，然后父组件再调用handleEndRefresh方法来更新刷新最终状态，如果8s没调用自动关闭下拉刷新 -->
<template>
    <view
        id="refresh-container"
        class="refresh-container"
        :style="{ overflow: overFlowValue}"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd">
        <!-- 下拉刷新区域 -->
        <view class="pulldown-refresh" :style="{ height: refreshHeight + 'px' }">
            <image
                class="refresh-icon"
                v-if="currentStatus === 'loading'"
                :src="imgUrl('pic_w_9.gif')"
            ></image>
            <text
                v-else-if="
                currentStatus === 'ready' ||
                currentStatus === 'success' ||
                currentStatus === 'fail'
                "
                >{{ pullDownText }}</text
            >
        </view>
        <!-- 内容区域 -->
        <slot></slot>
    </view>
</template>
<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue';
import { imgUrl,pxValueToPx } from '@/utils/tools'; 

const emit = defineEmits(['refresh']); // 定义刷新事件

const overFlowValue = ref<string>('hidden auto')
const pullDownText = ref<string>('下拉刷新'); // 下拉刷新文字
const refreshHeight = ref<number>(0); // 下拉刷新高度
const isRefreshing = ref<boolean>(false); // 是否正在刷新
const maxRefreshHeight = pxValueToPx(128,false); // 最大下拉刷新高度
const triggerHeight = pxValueToPx(80,false); // 达到这里才真正触发刷新，防止误触
const startY = ref<number>(0); // 开始触摸起始位置
const currentStatus = ref<null|'pulling' | 'ready' | 'loading' | 'success'| 'fail'>(null) //pulling:下拉刷新，ready: 准备刷新，loading: 正在刷新，success: 刷新成功
let timer:any|null = null; // 定时器，用于延迟显示刷新状态文字
let resetTimer:any|null = null; // 定时器，用于延迟重置状态

const handleTouchStart = (e: any) => {
    if(isRefreshing.value) return;
    startY.value = e.touches[0].clientY;
}
const handleTouchMove = (e: any) => {
    if(isRefreshing.value) return;
    const moveY = e.touches[0].clientY;
    const distance = moveY - startY.value; //移动距离
    const scrollTop = refreshContainer.value?.scrollTop || 0; // 滚动距离
    if(scrollTop > 0) return; // 滚动距离大于0，不触发下拉刷新
    //向下移动
    if(distance > 0){ 
        refreshHeight.value = Math.min(distance, Number(maxRefreshHeight)); // 限制最大下拉高度;
        updatePullDownText(refreshHeight.value > Number(triggerHeight) ? "ready" : "pulling"); // 达到触发高度时，显示松开刷新
    }
}
const handleTouchEnd = (e: any) => {
    if(isRefreshing.value) return;
    if(currentStatus.value === 'ready'){
        isRefreshing.value = true; // 开始刷新
        updatePullDownText('loading'); // 更新状态为正在刷新
        refreshHeight.value = Number(maxRefreshHeight); // 显示刷新动画
        overFlowValue.value = 'hidden'; //禁用滚动
        emit('refresh'); // 通知父组件触发刷新事件
        // 如果8s还没接收到父组件传递的刷新状态，则直接重置状态
        if(timer){
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(()=> handleResetRefresh('fail'), 8000);//重置状态
    }else {
        handleResetRefresh(); // 重置状态
    }

}
// 更新下拉刷新文字
const updatePullDownText = (status:any) => {
    currentStatus.value = status;
    switch (status) {
        case 'pulling':
            pullDownText.value = '下拉刷新';
            break;
        case 'ready':
            pullDownText.value = '松开刷新';
            break;
        case 'loading':
            pullDownText.value = '宝~光年外的算力已出发';
            break;
        case 'success':
            pullDownText.value = '更新完成';
            break;
        case 'fail':
            pullDownText.value = '更新失败';
            break;
        default:
            refreshHeight.value = 0;
            break;
    }
}
// 重置状态，关闭前改变文字
const handleResetRefresh = (status:any = null) => {
    updatePullDownText(status); // 更新文字状态
    // 延迟关闭刷新状态
    if(resetTimer){
        clearTimeout(resetTimer);
        resetTimer = null;
    }
    resetTimer = setTimeout(handleCloseRefresh, 200);
}
// 直接关闭刷新状态
const handleCloseRefresh = () => {
    refreshHeight.value = 0; // 重置高度
    isRefreshing.value = false; // 重置刷新状态
    currentStatus.value = null; // 重置状态
    overFlowValue.value = 'hidden auto';//恢复滚动 
}
const refreshContainer = ref<HTMLElement>(); //必须置顶时候才会触发下拉刷新
onMounted(() => {
    nextTick(()=>{
        refreshContainer.value = document.getElementById('refresh-container') as HTMLElement;
        handleCloseRefresh()
    })
})
// 暴露子组件方法，用于父组件调用
const handleEndRefresh = (status:'success'|'fail') => {
    // 如果父组件传递的状态，则把默认行为给取消掉
    if(timer){
        clearTimeout(timer);
        timer = null;
    }
    handleResetRefresh(status);
}
defineExpose({
    handleEndRefresh,
})
</script>
<style lang="scss" scoped>
*::-webkit-scrollbar {
  display: none;
  width: 0 !important;
}
*::-webkit-scrollbar-thumb {
  background: transparent;
  width: 0 !important;
}
#refresh-container{
    width: 100%;
    height: 100vh;
}
.pulldown-refresh {
    width: 100%;
    height: 0;
    background-color: #081a35;
    color: rgba(255, 255, 255, 0.5);
    font-size: 24rpx;
    transition: all 0.3s ease;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}
.refresh-icon {
    width: 80rpx;
    height: 80rpx;
}   
</style>