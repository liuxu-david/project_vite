<script setup>

import {computed, ref} from "vue";

const page = ref(1);
const pageSize = 10;
const pageItem = 30;
const dataRef = ref(null);
const data=[];
for (let i= 1; i < 200; i++){
  data.push({id:i,content:'数据'+i})
}

const dataResult = computed(()=>{
  return data.slice(0,page.value*pageSize);
})

const handleScroll = () => {
  const scrollTop = dataRef.value.scrollTop;
  const boxHeight = dataRef.value.offsetHeight;
  console.log(scrollTop,boxHeight)
  if(scrollTop >= pageItem*pageSize*page.value - boxHeight  + 10){
    page.value++;
    console.log('加载更多数据');
  }
}
</script>

<template>
  <div class="bigbox" @scroll="handleScroll" ref="dataRef">
    <div :style="{height: `${dataResult.length*pageItem+22}px`}">
      <div class="data_item" v-for="item in dataResult">{{item.content}}</div>
    </div>
  </div>
</template>

<style scoped>
.bigbox {
  width: 320px;
  height: 320px;
  border: 1px solid red;
  overflow-y: scroll;

  .data_item {
    width: 300px;
    height: 30px;
    border: 1px solid green;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>