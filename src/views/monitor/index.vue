<script setup>
import { computed, ref } from "vue";
import logo from "@/assets/vue.svg";

const obj = {};
const handleJsError = () => {
    console.log(obj.a.b);
};

const handlePromiseError = () => {
    Promise.reject(new Error("promise error"));
};

let img = ref(logo);
const handleAssetsError = () => {
    img.value = "https://xxx.png";
};
</script>

<template>
    <div class="monitor_container">
        <el-button type="primary" @click="handleJsError"
            >测试js逻辑报错</el-button
        >
        <el-button type="danger" @click="handlePromiseError"
            >测试promise报错</el-button
        >
        <el-button type="warning" @click="handleAssetsError"
            >测试资源报错</el-button
        >
        <img :src="img" alt="" />
    </div>
</template>

<style lang="less" scoped>
.monitor_container {
    display: flex;
    gap: 10px;
}
</style>
