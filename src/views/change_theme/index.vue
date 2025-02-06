<script setup>
import { changeTheme } from "@/utils/changeTheme";
</script>
<template>
    <div>
        <el-button type="primary" @click="changeTheme('light')"
            >浅色模式</el-button
        >
        <el-button type="primary" @click="changeTheme('dark')"
            >深色模式</el-button
        >
        <div class="test-theme"></div>
        <button class="test-btn">测试按钮</button>
    </div>
</template>
<style lang="less" scoped>
.test-theme {
    width: 200px;
    height: 200px;
    background-color: var(--background-color);
}
.test-btn {
    background-color: var(--btn-color);
}
</style>
