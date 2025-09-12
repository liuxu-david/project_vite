<!-- 自定义提示框组件，自定义时间关闭,声明式组件，直接使用showCustomToast({}) -->
 <!-- 适配2种情况,1纯文本提示,2带一个action按钮的提示 -->
<template>
    <view class="toast-container" :style="{width: pxValueToPx(customWidth)}">
        <view class="toast-content">
            <text>{{ message }}</text>
            <view 
                v-if="actionText"
                class="action-button"
                @click="handleAction"
            >{{ actionText }}</view>
        </view>
    </view>
</template>
  
<script setup lang="ts">
import { pxValueToPx } from '@/utils/tools';

interface Props {
    customWidth?: number, // 提示框宽度，默认510px
    message: string, // 提示信息
    duration?:number // 
    actionText?: string
    onAction?: () => void;
}
const props = withDefaults(defineProps<Props>(),{
    customWidth: 550,
    message: "提示信息",
    duration: 2000
})

const handleAction = ()=>{
    props.onAction?.();
}
</script>
  
<style lang="scss" scoped>
.toast-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 25rpx;
    max-width: 85%;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 8rpx;
    .toast-content{
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgba(255, 255, 255, 0.9);
        .action-button{
            box-sizing: border-box;
            height: 56rpx;
            border-radius: 8rpx;
            padding: 8rpx 20rpx;
            background-color: rgba(0, 119, 255, 1);
            font-size: 28rpx;
            color: rgba(255, 255, 255, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>
  