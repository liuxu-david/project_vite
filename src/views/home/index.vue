<script setup>
  import { useRouter } from "vue-router";

  const router = useRouter();

  const handleToList = () => {
    router.push("/list");
  };
  const handleToOrder = () => {
    router.push("/table");
  };
</script>

<template>
  <div class="function">
    <button class="list" @click="handleToList">跳转虚拟列表页面</button>
    <button class="order" @click="handleToOrder">跳转点餐页面</button>
  </div>
</template>

<style scoped lang="less">
  .function {
    width: 300px;
    height: 300px;
    border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 50px;
    .list,
    .order {
      width: 150px;
      height: 30px;
      background-color: green;
      color: white;
      font-size: 12px;
      border-radius: 5px;
    }
    .order {
      display: block;
      margin-top: 50px;
    }
  }
</style>
