<template>
  <view class="flex-box" ref="flexBox">
    <view
      ref="dataStatsRef"
      style="height: 200rpx; background-color: red"
    ></view>
    <view
      style="height: 200rpx; background-color: green; position: sticky; top: 0"
    ></view>
    <view style="background-color: salmon" class="flex-table" ref="flexTable">
      <view
        style="display: flex"
        class="flex-table-header"
        ref="flexTableHeader"
        :class="{ header_fixed: isHeaderFixed, header_static: !isHeaderFixed }"
      >
        <view v-for="i in 30" :key="i"> test {{ i }} </view>
      </view>
      <view
        class="flex-table-body"
        :style="{
          paddingTop: isHeaderFixed ? `${flexTableHeaderHeight}px` : '0',
        }"
      >
        <view v-for="i in 50" :key="i" style="display: flex">
          <view v-for="j in 30" :key="j" style="color: #fff">
            test {{ i }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
        
  <script setup lang="ts">
import { onMounted, ref, nextTick, onUnmounted, computed } from "vue";

const flexBox = ref<HTMLElement | null>(null);
const flexTable = ref<HTMLElement | null>(null);
const flexTableHeader = ref<HTMLElement | null>(null);
const flexTableHeaderHeight = ref(0); //解决滚动上去固定表头，下面表格上滚一段距离问题
const dataStatsRef = ref<HTMLElement | null>(null);
const scrollTop = ref(0);
const scrollLeft = ref(0);
const touch_type = ref(""); //触摸事件很重要，这是解决ios滚动不卡顿的关键 水平滚动二者会冲突，所以需要添加触摸事件

const isHeaderFixed = computed(
  () => scrollTop.value > (dataStatsRef.value?.$el.offsetHeight || 0)
);
// 垂直方向滚动
const handleVerticalScroll = (e) => {
  scrollTop.value = e.target.scrollTop;
};
// 表头水平滚动(此时表头已经脱离文档流，是单独的滚动区域)
const handleHeaderHorizontalScroll = (e) => {
  if (!flexTable.value || touch_type.value === "table") return;
  scrollLeft.value = e.target.scrollLeft;
  flexTable.value.$el.scrollLeft = scrollLeft.value;
};
// 表格水平滚动
const handleTableHorizontalScroll = (e) => {
  if (!flexTableHeader.value || touch_type.value === "header") return;
  scrollLeft.value = e.target.scrollLeft;
  flexTableHeader.value.$el.scrollLeft = scrollLeft.value;
};
// 添加滚动监听事件
const handleAddScrollEvent = () => {
  if (flexBox.value && flexTableHeader.value && flexTable.value) {
    // 垂直滚动
    flexBox.value.$el.addEventListener("scroll", handleVerticalScroll);
    // 水平滚动
    flexTableHeader.value.$el.addEventListener(
      "scroll",
      handleHeaderHorizontalScroll
    );
    flexTable.value.$el.addEventListener("scroll", handleTableHorizontalScroll);
    // 触摸事件解决ios卡顿问题
    flexTableHeader.value.$el.addEventListener(
      "touchstart",
      () => {
        touch_type.value = "header";
        console.log("header touchstart");
      },
      true
    );
    flexTable.value.$el.addEventListener(
      "touchstart",
      () => {
        touch_type.value = "table";
        console.log("table touchstart");
      },
      true
    );
  }
};
// 移除监听滚动事件
const handleRemoveScrollEvent = () => {
  if (flexBox.value && flexTableHeader.value && flexTable.value) {
    flexBox.value.$el.removeEventListener("scroll", handleVerticalScroll);
    flexTableHeader.value.$el.removeEventListener(
      "scroll",
      handleHeaderHorizontalScroll
    );
    flexTable.value.$el.removeEventListener(
      "scroll",
      handleTableHorizontalScroll
    );
    flexTableHeader.value.$el.removeEventListener("touchstart", () => {
      touch_type.value = "header";
      console.log("header touchstart");
    });
    flexTable.value.$el.removeEventListener("touchstart", () => {
      touch_type.value = "table";
      console.log("table touchstart");
    });
  }
};
onMounted(() => {
  nextTick(() => {
    //   触发上下滚动事件
    flexTableHeaderHeight.value = flexTableHeader.value?.$el.offsetHeight || 0;
    handleAddScrollEvent();
  });
});
onUnmounted(() => {
  handleRemoveScrollEvent();
});
</script>
        
  <style lang="scss" scoped>
/* 防止滚动穿透 */
.flex-box {
  height: 100vh;
  overflow-y: auto;
  overscroll-behavior: contain;
}
.flex-table {
  width: 100vw;
  overflow-x: auto;
  .flex-table-header {
    top: 200rpx;
  }
  .header_fixed {
    position: fixed;
    overflow-x: scroll;
    width: 100vw;
  }
  .header_static {
    position: static;
    overflow: visible;
  }
}
</style>