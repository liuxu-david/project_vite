<!-- 自定义模态框组件 -->
 <!-- 适配: 提示模态框,自定义表头,自定义内容,操作按钮可要可不要,自定义底部按钮通过插槽控制 -->
<template>
    <Teleport to="body">
        <Transition name="modal">
            <view v-show="showModel" class="modal-mask" :style="{backgroundColor: showMask ? 'rgba(0, 0, 0, 0.3)' : ''}" @click="handleCancel">
                <view class="modal-container" @click.stop>
                    <!-- 模态框头部 -->
                    <view class="modal-header">
                        <slot name="header">{{ title }}</slot>
                    </view>
                    <!-- 模态框内容 -->
                    <view class="modal-body">
                        <slot name="body">{{ content }}</slot>
                    </view>
                    <!-- 模态框按钮部分 取消确认按钮 -->
                    <view class="modal-footer" v-if="isShowFooter">
                        <slot name="footer">
                            <img :src="imgUrl('btn_w_4normal.png')" alt="" class="concel" @click="handleCancel">
                            <img :src="imgUrl('btn_w_11.png')" alt="" class="confirm" @click="handleConfirm">
                        </slot>
                    </view>
                </view>
            </view>
        </Transition>
    </Teleport>
</template>
  
<script setup lang="ts">
import { imgUrl } from '@/utils/tools';
interface Props {
    showModel: boolean//控制模态框显示隐藏
    showMask?: boolean, // 默认模态框是否显示遮罩层
    title?: string, // 默认模态框标题
    content?: string, // 默认模态框内容
    isShowFooter?: boolean // 不需要显示底部按钮,传false,需要自定义底部按钮,通过插槽自定义
}
// 如果样式一致,传参即可，如果自定义样式，通过插槽自定义
const props = withDefaults(defineProps<Props>(),{
    showModel: false,
    showMask: true,
    title: '提示',
    content: '是否批量删除所选自选股票?',
    isShowFooter: true,
})
const emit = defineEmits<{
    (e: 'confirm'): void,
    (e: 'cancel'): void,
}>()

// 点击确定触发父组件确定后执行方法
const handleConfirm = () => {
    emit('confirm')
}
// 点击取消触发父组件取消后执行方法
const handleCancel = () => {
    emit('cancel')
}
</script>
  
<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
  .modal-container {
    width: 560rpx;
    padding: 30rpx;
    box-sizing: border-box;
    background-color: rgba(12, 62, 135, 1);
    border-radius: 20rpx;
    transition: all 0.3s ease;
    .modal-header {
        display: flex;
        justify-content: center;
        font-size: 36rpx;
        font-weight: 700;
        color: rgba(255, 255, 255, 1);
    }
    .modal-body {
        display: flex;
        justify-content: center;
        margin: 20rpx 0 30rpx 0;
        color: rgba(255, 255, 255, 0.9);
    }
    .modal-footer{
        display: flex;
        justify-content: center;
        gap: 20rpx;
        .confirm,.concel{
            width: 240rpx;
            height: 82rpx;
        }
    }
  }
}
// 动画
.modal-enter-from,.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(0.8);
  transform: scale(0.8);
}
</style>
  