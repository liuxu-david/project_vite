<template>
    <div class="page">
        <div class="header">
            <el-dropdown placement="bottom-end" class="download_icon">
                <el-icon :size="25" @click="handleTask"
                    ><FolderOpened
                /></el-icon>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>The Action 1st</el-dropdown-item>
                        <el-dropdown-item>The Action 2st</el-dropdown-item>
                        <el-dropdown-item>The Action 3st</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <div class="operation">
            <el-button type="primary" @click="handleDataImport"
                >导入文件</el-button
            >
            <el-button type="success" @click="handleDownloadData"
                >导出数据</el-button
            >
            <el-upload
                ref="upload"
                class="upload-demo"
                :http-request="handleUpload"
            >
                <template #trigger>
                    <el-button type="primary">上传图片到OBS</el-button>
                </template>
            </el-upload>
        </div>
        <div class="content">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="id" label="ID" width="180" />
                <el-table-column prop="date" label="时间" width="180" />
                <el-table-column prop="name" label="姓名" width="180" />
                <el-table-column prop="age" label="年龄" />
            </el-table>
        </div>
        <!-- 导入弹窗 -->
        <import-dialog
            v-model:visiable="importVisiable"
            :title="importTitle"
            :key="InfoKey"
            @success="handleTip"
        ></import-dialog>
        <!-- 展示标签 -->
        <info-dialog v-if="infoVisiable"></info-dialog>
    </div>
</template>

<script setup>
import importDialog from "./components/importDialog.vue";
import infoDialog from "./components/infoDialog.vue";
import { FolderOpened } from "@element-plus/icons-vue";
import { ref } from "vue";
import { getSignature_API, uploadImageToOBS_API } from "@/service/uploadMore";

const importVisiable = ref(false);
const infoVisiable = ref(false);
const importTitle = ref("");
const InfoKey = ref("");
const tableData = [
    {
        id: 0,
        date: "2016-05-03",
        name: "Tom",
        age: 59,
    },
    {
        id: 1,
        date: "2016-05-02",
        name: "Tom",
        age: 46,
    },
    {
        id: 2,
        date: "2016-05-04",
        name: "Tom",
        age: 20,
    },
    {
        id: 3,
        date: "2016-05-01",
        name: "Tom",
        age: 18,
    },
];

// 导入
const handleDataImport = () => {
    importVisiable.value = true;
    importTitle.value = "导入数据";
    InfoKey.value = "USERKEY";
};
// 导出
const handleDownloadData = () => {
    ElMessageBox.confirm("是否确定导出列表数据?", "导出数据", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
    })
        .then(() => {
            ElMessage({
                type: "success",
                message: "导出任务进行中",
            });
        })
        .catch(() => {
            ElMessage({
                type: "info",
                message: "取消导出任务",
            });
        });
};
// 查看任务列表
const handleTask = () => {};
// 提示弹窗
const handleTip = () => {
    infoVisiable.value = true;
    setTimeout(() => {
        infoVisiable.value = false;
    }, 5000);
};
// 上传图片到OSS
const handleUpload = async (options) => {
    const { file } = options;
    const filename = file.name;
    console.log("🚀 ~ handleUpload ~ file:", file);
    const data = await getSignature_API();
    const formData = new FormData();
    formData.append("name", filename);
    formData.append("policy", data.policy);
    formData.append("OSSAccessKeyId", data.ossAccessKeyId);
    formData.append("success_action_status", "200");
    formData.append("signature", data.signature);
    formData.append("key", data.dir + filename);
    formData.append("file", file);
    try {
        const res = await uploadImageToOBS_API(data.host, formData);
    } catch (error) {
        console.error("发生错误:", error);
    }
};
</script>

<style lang="less" scoped>
.page {
    width: 100%;
    height: 100vh;
    background-color: #f2f3f5;
    .header {
        display: flex;
        justify-content: end;
        height: 50px;
        line-height: 50px;
        background-color: #ffffff;
        .download_icon {
            margin: 10px 15px 0;
            cursor: pointer;
        }
    }
    .operation {
        margin: 10px 0;
    }
}
</style>
