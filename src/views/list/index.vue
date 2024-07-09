<script setup>
import {computed, onMounted, reactive, ref} from "vue";

// 数据定义
const listRef = ref(null);
let scrollTop = ref(0);
let viewHeight = 0;
let itemHeight = 30;
let itemSum = ref(0);
let startIndex = ref(0);

// 后端返回的数据
const data = [];
for (let i = 1; i <= 200; i++) {
  data.push({id: i, content: `列表${i}`});
}
// 计算属性
const handleListResult = computed(()=>{
  const endIndex = startIndex.value + itemSum.value;
  const result = data.slice(startIndex.value, endIndex);
  console.log(result)
  console.log(startIndex.value,endIndex)
  return result;
})
// 数据监听
// 生命周期钩子
onMounted(() => {
  viewHeight = listRef.value.offsetHeight;
  itemSum.value = Math.ceil(viewHeight/itemHeight);
});

// 方法处理
const handleListScroll = () => {
  scrollTop.value = listRef.value.scrollTop;
  startIndex.value = Math.floor(scrollTop.value/itemHeight);
}
</script>

<template>
  <div class="list" @scroll="handleListScroll" ref="listRef">
    <ul :style="{height:`${itemHeight*data.length}px`}">
      <li class="list_item" v-for="item in handleListResult" :key="item.id">{{ item.content }}</li>
    </ul>
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