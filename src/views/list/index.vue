<script setup>
  import { computed, onMounted, reactive, ref } from "vue";

  // 数据定义
  const listRef = ref(null); //用于获取可视区域高度
  let scrollTop = ref(0); //滚动高度
  let viewHeight = 0; //可视区域的高度
  let itemHeight = 30; //每项固定高度
  let itemSum = ref(0); //展示条数
  let startIndex = ref(0); //起始索引

  // 后端返回的数据
  const data = [];
  for (let i = 1; i <= 200; i++) {
    data.push({ id: i, content: `列表${i}` });
  }
  // 计算属性
  const handleListResult = computed(() => {
    const endIndex = startIndex.value + itemSum.value;
    endIndex > data.length ? data.length : endIndex;
    const result = data.slice(startIndex.value, endIndex);
    console.log(result);
    console.log(startIndex.value, endIndex);
    return result;
  });
  // 数据监听
  // 生命周期钩子
  onMounted(() => {
    viewHeight = listRef.value.offsetHeight;
    itemSum.value = Math.ceil(viewHeight / itemHeight);
  });

  // 方法处理
  const handleListScroll = () => {
    scrollTop.value = listRef.value.scrollTop;
    startIndex.value = Math.floor(scrollTop.value / itemHeight);
  };
  const throttle = (fn, dalay) => {
    let timer = null;
    return function (...agrgs) {
      if (timer) return;
      timer = setTimeout(() => {
        fn.apply(this, agrgs);
        timer = null;
      }, dalay);
    };
  };
  const handleThrottleScroll = throttle(handleListScroll, 100);
</script>

<template>
  <div class="list" @scroll="handleThrottleScroll" ref="listRef">
    <div :style="{ height: `${itemHeight * data.length}px` }">
      <ul
        :style="{
          transform: `translateY(${startIndex * itemHeight}px)`,
        }"
      >
        <li class="list_item" v-for="item in handleListResult" :key="item.id">
          {{ item.content }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
  .list {
    width: 310px;
    height: 320px;
    border: 1px solid red;
    overflow-y: scroll;

    .list_item {
      height: 30px;
      width: 300px;
      border: 1px solid green;
      margin-left: -10px;
      list-style: none;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
