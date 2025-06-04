<!-- 自定义提示框组件，自定义时间关闭 -->
 <!-- 适配2种情况,1纯文本提示,2带一个action按钮的提示 -->
<template>
    <Transition name="toast">
        <view v-show="showToast" class="toast-container" :style="{width: pxValueToPx(customWidth)}">
            <div class="toast-content">
                <text>{{ message }}</text>
                <slot name="actions"></slot>
            </div>
        </view>
    </Transition>
</template>
  
<script setup lang="ts">
import { watch } from 'vue';
import { pxValueToPx } from '../../utils/tools'

interface Props {
    customWidth?: number, // 提示框宽度，默认510px
    showToast: boolean, // 控制提示框显示隐藏
    message: string, // 提示信息
    duration?: number, //提示框关闭的时间，默认2s
}
const props = withDefaults(defineProps<Props>(),{
    customWidth: 510,
    showToast: false,
    message: "提示信息",
    duration: 2000,
})
const emit = defineEmits<{
    (e: 'update:showToast', value: boolean): void,
}>()

let timer:any = null;
watch(() => props.showToast, (val) => {
    if (val) {
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
            emit('update:showToast', false)
        }, props.duration);
    } 
})
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
    transition: all 0.3s ease;
    .toast-content{
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
// 进入前离开后动画
.toast-enter-from, .toast-leave-to {
    opacity: 0;
}
</style>
  