<!-- 自定义弹出层， 可从上面或者下面弹出一个弹窗，内容自定义插槽传入 -->
<template>
    <view 
       v-show="isShowPopup"
       class="popup-container"
       :style="{backgroundColor: showOverlay ? 'rgba(0, 0, 0, 0.3)' : ''}"
       @click="handleOverlayClick">
           <Transition :name="position === 'top' ? 'slidedown' : 'slideup'">
               <view  v-show="isShowPopup" :class="['popup-content',`popup-content-${position}`]" @click.stop>
                   <slot name="content"></slot>
               </view>
           </Transition>
       </view>  
</template>

<script setup lang="ts">

interface Props {
   isShowPopup: boolean, // 控制弹窗显示隐藏
   showOverlay?: boolean, // 控制遮罩层显示隐藏
   position?: 'top' | 'bottom', // 控制弹窗位置,默认从下方弹出
}
const props = withDefaults(defineProps<Props>(),{
   isShowPopup:false,
   showOverlay: true,
   position: 'bottom',
})

// 点击遮罩层操作
const emit = defineEmits<{
   (e: 'overlayClick'): void,
}>()
const handleOverlayClick = () => {
   emit('overlayClick')
}
</script>

<style scoped lang="scss">
.popup-container{
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   z-index: 9999;
   .popup-content{
       background-color: rgba(11, 36, 77, 1);
       width: 100%;
       min-height: 100rpx;
   }
   .popup-content-bottom{
       position: absolute;
       bottom: 0;
       left: 0;
       right: 0;
       border-radius: 30rpx 30rpx 0 0;
   }
   .popup-content-top{
       position: absolute;
       top: 0;
       left: 0;
       right: 0;
       border-radius: 0 0 30rpx 30rpx;
   }
}
/* 从滑入滑出动画 */
.slideup-enter-active, .slideup-leave-active,
.slidedown-enter-active, .slidedown-leave-active {
   transition: all 0.3s ease;
}
.slideup-enter-from, .slideup-leave-to {
   transform: translateY(100%);
}
.slidedown-enter-from, .slidedown-leave-to {
   transform: translateY(-100%);
}
</style>