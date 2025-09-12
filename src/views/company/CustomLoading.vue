<!-- 数据飞奔中组件，默认全屏垂直水平居中，可传入marginTop轻微调整垂直位置，控制显示的位置，大幅度调整铜过outerHeight -->
<template>
    <view class="custom-loading" :style="{ height: containerHeight + 'px' }">
        <view class="content" :style="{ marginTop: `${pxValueToRem(marginTop)}` }">
            <img class="loading-icon" :src="imgUrl('pulldownIcon')" />
            <text class="loading-text">数据在飞奔...</text>
        </view>
    </view>
</template>
<script lang="ts" setup>
import { imgUrl, pxValueToRem, pxValueToPx } from '@/utils/tools'
import { computed } from 'vue';
const props = withDefaults(defineProps<{
    marginTop?: number;//细微调整
    outerHeight?: number; // 这个参数很重要，用来控制图标始终垂直居中，最外层高度(设计稿上的高度)，默认全屏，传入值后，高度为windowHeight - outerHeight
}>(), {
    marginTop: 0,
    outerHeight: 0,
})

// 获取系统/设备信息，用于确定容器元素高度
const windowHeight = uni.getSystemInfoSync().windowHeight;
const containerHeight = computed(() => {
    return props.outerHeight > 0 ? windowHeight - Number(pxValueToPx(props.outerHeight, false) || 0) : windowHeight;
});
</script>

<style lang="scss" scoped>
.custom-loading {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    .content {
        width: 235rpx;
        height: 192rpx;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 8rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 150rpx;

        .loading-icon {
            width: 100rpx;
            height: 100rpx;
        }

        .loading-text {
            color: var(选中2, rgba(255, 255, 255, 1));
            font-size: 30rpx;
            margin-top: 10rpx;
        }
    }
}
</style>
