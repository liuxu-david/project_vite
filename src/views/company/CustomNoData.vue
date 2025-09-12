<!-- - 自定义无数据组件(NoData) -->
<!-- 可自定义显示图片，提示文字，以及自定义组件高度，默认高度是全屏 -->
<template>
  <view class="no-data-container" :style="{ height: containerHeight + 'px' }">
    <img :src="noDataImgSrc" :style="{
      width: `${pxValueToRem(width)}`,
      marginTop: `${pxValueToRem(marginTop)}`
    }" />
    <view class="default-desc">
      <!-- 传入对应的自定义描述文字和样式，默认是网络失败文字 -->
      <slot name="desc">
        {{ desc }}
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { imgUrl, pxValueToPx, pxValueToRem } from '@/utils/tools';
import { computed, withDefaults } from 'vue';
const props = withDefaults(
  defineProps<{
    // 参数有默认值，可传入参数进行覆盖
    imgSrc?: string; // 图片地址
    width?: number; // 传入设计稿上图片的px宽度会根据设备宽度计算出适配宽度
    marginTop?: number;//垂直方向会根据outerHeight进行垂直居中,如果不合适传入这个参数对（图标和文字）进行上下调整,
    desc?: string; // 描述文字
    outerHeight?: number; // 设备视口内除此组件以外的高度（设计稿上其它元素占据的px值），用于设置此组件的高度，如果不传入默认无数据组件高度就是设备可视区域高度，传入则是设备高度可视区减去传入的格式化（内部会格式化，直接传设计稿高度）后值
  }>(),
  {
    // 默认值
    imgSrc: 'pic_w_1.png',
    width: 300,
    marginTop: 0,
    outerHeight: 0,
    desc: "网emo了，戳这里哄它上线！点击屏幕重新加载",
  }
);

// 获取系统/设备信息，用于确定容器元素高度
const windowHeight = uni.getSystemInfoSync().windowHeight;
const containerHeight = computed(() => {
  return props.outerHeight > 0 ? windowHeight - Number(pxValueToPx(props.outerHeight, false) || 0) : windowHeight;
});
const noDataImgSrc = computed(() => imgUrl(props.imgSrc))
</script>

<style scoped lang="scss">
.no-data-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  // background-color: yellow;
  .default-desc {
    width: 320rpx;
    box-sizing: border-box;
    font-size: 24rpx;
    font-weight: 500;
    color: var(文字4, rgba(255, 255, 255, 0.5));
    text-align: center;
    margin-top: -45rpx;
  }
}
</style>
