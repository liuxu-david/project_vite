<template>
    <el-card style="max-width: 480px" class="info_dialog">
        <el-icon size="25" color="green" class="icon"
            ><WarnTriangleFilled /></el-icon
        >任务进行中，右上角任务中心可查看进度
    </el-card>
</template>

<script setup>
import { WarnTriangleFilled } from "@element-plus/icons-vue";
</script>

<style lang="less" scoped>
.info_dialog {
    position: fixed;
    right: 0;
    top: 58px;
    z-index: 9999;
    .icon {
        vertical-align: middle;
        margin-right: 10px;
    }
}
</style>
