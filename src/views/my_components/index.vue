<script setup>
  import { ElMessage } from "element-plus";
  const debounce = (fn, delay, flag = false) => {
    let timer = null;
    return function (...args) {
      if (timer) clearTimeout(timer);
      if (flag) {
        fn.apply(args);
        flag = false;
      }
      timer = setTimeout(() => {
        fn.apply(args);
        timer = null;
      }, delay);
    };
  };
  const open1 = debounce(
    () => {
      ElMessage({
        message: "Congrats, this is a success message.",
        type: "success",
        plain: true,
      });
    },
    1000,
    true
  );
</script>

<template>
  <div>
    <el-button :plain="true" @click="open1">Success</el-button>
  </div>
</template>

<style scoped></style>
