<template>
    <view class="custom-load-more" v-if="visible" :style="{ height: loadingHeight + 'rpx' }">
        <img v-if="loadingType === 0" class="loading-icon" :src="imgUrl('pic_w_9.gif')" />
        <view v-else-if="loadingType === 2" class="loading-text">加载失败</view>
    </view>
</template>

<script setup lang="ts">
import { imgUrl } from '@/utils/tools'
import { computed, ref } from 'vue';

const visible = ref<boolean>(false); //加载更多是否显示
const loadingType = ref<number>(0); //加载状态
let timer: any = null; //定时器

const loadingHeight = computed(() => {
    return loadingType.value === 1 ? 0 : 128

})

// 0:加载中 1:加载成功 2:加载失败
const showLoadMore = (isShow: boolean, type: number = 0) => {
    visible.value = isShow;
    loadingType.value = type
    if (type === 2) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            visible.value = false
        }, 2000)
    }
}

// 父组件触发
defineExpose({
    showLoadMore
})

</script>

<style lang="scss" scoped>
.custom-load-more {
    width: 100%;
    height: 128rpx;
    background-color: var(框架1, rgb(8, 26, 53));
    font-size: 24rpx;
    font-weight: 500;
    color: var(文字4, rgba(255, 255, 255, 0.5));
    display: flex;
    justify-content: center;
    align-items: center;
    transition: height 0.1s ease;

    .loading-icon {
        width: 80rpx;
        height: 80rpx;
    }
    .loading-text {
        color: var(文字4, rgba(255, 255, 255, 0.5));
        font-size: 24rpx;
        font-weight: 500; 
    }
}
</style>
