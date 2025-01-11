<template>
    <div class="inline-block">
        <el-popover
            class="custom-popover"
            placement="right"
            trigger="hover"
            content="复制"
        >
            <template #reference>
                <el-icon v-copy="props.content"><DocumentCopy /></el-icon>
            </template>
        </el-popover>
    </div>
</template>

<script setup>
import { DocumentCopy } from "@element-plus/icons-vue";

const props = defineProps({
    content: {
        type: String,
        default: "",
    },
});
</script>

<style lang="less" scoped>
.inline-block {
    display: inline-block;
    vertical-align: middle;
    margin-left: 5px;
    .custom-popover {
        /* 限制宽度 */
        min-width: 40px;
        max-width: 60px;
        text-align: center; /* 让文本居中 */
    }
}
</style>
