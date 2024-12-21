<template>
    <el-dialog
        v-model="visiable"
        :title="props.title"
        width="800"
        @close="handleClose"
    >
        <el-upload class="upload-demo" drag :http-request="handleUpload">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                拖动图片到这里或者 <em>点击上传</em>
            </div>
            <template #tip>
                <div class="el-upload__tip">提示 : 一次只可上传一个文件</div>
            </template>
        </el-upload>
    </el-dialog>
</template>

<script setup>
import { UploadFilled } from "@element-plus/icons-vue";
import { toRef, ref } from "vue";
import {
    verifyFile_API,
    uploadFile_API,
    mergeFile_API,
} from "@/service/uploadMore";
import pLimit from "p-limit";

const props = defineProps({
    visiable: Boolean,
    title: String,
    key: String,
});
const visiable = toRef(props, "visiable");
const emit = defineEmits();
const worker = ref(null); //开启webworker任务
const chunkSize = 1 * 1024 * 1024; //单个切片大小1M
const maxLimit = 6; //控制高并发，同时不超过6个

// 文件切片
const handleSliceFlie = (file, fileHash) => {
    let startFileIndex = ref(0); //开始切割索引
    const fileChunkList = ref([]); //切片存入数组
    let index = 0; //唯一标志，用于后续后端合并时候排序
    while (startFileIndex.value < file.size) {
        // 文件可以直接使用slice进行切割
        const endFileIndex = Math.min(
            startFileIndex.value + chunkSize,
            file.size
        );
        const curChunkFile = file.slice(startFileIndex.value, endFileIndex);
        fileChunkList.value.push({
            id: index,
            chunkfile: curChunkFile,
            uploaded: false,
            fileHash: fileHash,
        });
        index++;
        startFileIndex.value += chunkSize;
    }
    return fileChunkList.value;
};
// 文件md5处理
const handleFileHash = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) reject("没有文件");
        worker.value = new Worker(new URL("../worker.js", import.meta.url), {
            type: "module",
        });
        // 发送文件再webworker中进行md5处理
        worker.value.postMessage(file);
        worker.value.onmessage = (event) => {
            // 1.主线程监听数据 加密
            const fileHash = event.data;
            console.log("🚀 ~ handleFileHash ~ fileHash:", fileHash);
            resolve(fileHash);
        };
    });
};
// 文件验证方法(返回需要上传的分片数组)
const handleVerify = async (fileHash, fileChunks) => {
    try {
        const res = await verifyFile_API({ fileHash, fileChunks });
        return res;
    } catch (error) {}
};
// 单个分片上传
const handlefileChunk = async (chunk) => {
    const formData = new FormData();
    formData.append("id", chunk.id);
    formData.append("chunkfile", chunk.chunkfile);
    formData.append("fileHash", chunk.fileHash);
    try {
        await uploadFile_API(formData);
    } catch (error) {}
};
// 多个分片上传(如果分片过多需要控制高并发)
const handlefileChunks = async (chunks) => {
    // if (!chunks.length) return;
    const uploadPromiseList = [];
    const limit = pLimit(maxLimit);
    chunks.forEach((chunk) => {
        uploadPromiseList.push(limit(() => handlefileChunk(chunk)));
    });
    try {
        await Promise.all(uploadPromiseList);
    } catch (error) {
        // 文件上传失败，重新上传
    }
};

// 文件合并
const handleMergeFile = async (fileHash, totalChunksNum, name) => {
    try {
        const res = mergeFile_API({ fileHash, totalChunksNum, name });
        // 提示文件上传成功，文件开始写入数据库
    } catch (error) {}
};

// 处理上传
const handleUpload = async (options) => {
    const { file } = options;
    console.log("🚀 ~ handleUpload ~ file:", file);
    const fileHash = await handleFileHash(file);
    // 2.处理分片
    const fileChunks = handleSliceFlie(file, fileHash);
    console.log("🚀 ~ handleFileHash ~ fileChunks:", fileChunks);
    // 3.发送验证请求
    const uploadedChunks = await handleVerify(fileHash, fileChunks);
    console.log("🚀 ~ handleUpload ~ uploadedChunks:", uploadedChunks);
    // 4.过滤掉已经存在的文件 (妙传)
    const formatChunks = fileChunks.filter(
        (chunk) => !uploadedChunks.includes(Number(chunk.id))
    );
    // 5.分片上传
    await handlefileChunks(formatChunks);
    // 6.合并分片
    await handleMergeFile(fileHash, fileChunks.length, file.name);
};
// 关闭弹窗
const handleClose = () => {
    emit("update:visiable", false);
};
</script>

<style lang="less" scoped></style>
