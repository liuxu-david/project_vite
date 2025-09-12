<template>
    <view class="custom-tab-loading" v-if="visible" :style="{ height: containerHeight + 'px' }">
        <img class="loading-icon" :src="imgUrl('pic_w_9.gif')" />
    </view>
</template>

<script setup lang="ts">
import { imgUrl,pxValueToPx } from '@/utils/tools'
import { computed, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    outerHeight?: number; // 设备视口内除此组件以外的高度（设计稿上其它元素占据的px值），用于设置此组件的高度，如果不传入默认无数据组件高度就是设备可视区域高度，传入则是设备高度可视区减去传入的格式化（内部会格式化，直接传设计稿高度）后值
  }>(),
  {
    // 默认值
    outerHeight: 104,
  }
);
const visible = ref<boolean>(false); //加载更多是否显示

// 获取系统/设备信息，用于确定容器元素高度
const windowHeight = uni.getSystemInfoSync().windowHeight;
const containerHeight = computed(() => {
  return props.outerHeight > 0 ? windowHeight - Number(pxValueToPx(props.outerHeight, false) || 0) : windowHeight;
});

// isShow:是否显示
const showTabLoading = (isShow: boolean = false) => {
    visible.value = isShow;
}
defineExpose({
    showTabLoading
})
</script>

<style lang="scss" scoped>
.custom-tab-loading {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    width: 100vw;
    background-color: var(框架1, rgb(8, 26, 53));
    display: flex;
    justify-content: center;
    align-items: start;
    .loading-icon {
        width: 80rpx;
        height: 80rpx;
    }
}
</style>
