<template>
    <div>
        <el-button :plain="true" @click="open1">Success</el-button>
        <el-button type="primary" v-copy>一键复制</el-button>
        <my-copy :content="info"></my-copy>
    </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import myCopy from "./myCopy.vue";

const info = "啦啦啦啦";

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

<style scoped></style>
