<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const handleToPage = (url) => {
    router.push(url);
};
</script>

<template>
    <div class="function">
        <button class="theme" @click="handleToPage('/theme')">一键换肤</button>
        <button class="company" @click="handleToPage('/company')">
            企业级大数据量文件上传和下载
        </button>
        <button class="db" @click="handleToPage('/db')">
            跳转验证数据库页面
        </button>
        <button class="list" @click="handleToPage('/list')">
            跳转虚拟列表页面
        </button>
        <button class="list_extend" @click="handleToPage('/list_extend')">
            跳转时间分片页面
        </button>
        <button class="refresh" @click="handleToPage('/refresh')">
            跳转触底加载页面
        </button>
        <button class="order" @click="handleToPage('/upload_files')">
            跳转大文件上传页面
        </button>
        <button class="order" @click="handleToPage('/components')">
            跳转组件封装页面
        </button>
    </div>
</template>

<style scoped lang="less">
.function {
    width: 500px;
    height: 700px;
    border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 50px;
    margin-top: -20px;

    .theme,
    .company,
    .db,
    .list,
    .list_extend,
    .refresh,
    .order,
    .components {
        width: 200px;
        height: 30px;
        background-color: green;
        color: white;
        font-size: 12px;
        border-radius: 5px;
    }
    .company,
    .db,
    .list,
    .order,
    .refresh,
    .list_extend {
        display: block;
        margin-top: 50px;
    }
}
</style>
