<script setup></script>

<template>
  <div class="list">
    <ul>
      <li class="list_item">虚拟列表页面</li>
    </ul>
  </div>
</template>

<style scoped lang="less">
  .list {
    width: 350px;
    height: 600px;
    border: 1px solid red;

    .list_item {
      height: 50px;
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
