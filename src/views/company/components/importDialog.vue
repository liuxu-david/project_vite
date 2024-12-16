<template>
  <el-dialog
    v-model="visiable"
    :title="props.title"
    width="800"
    @close="handleClose"
  >
    <el-upload class="upload-demo" drag :http-request="handleUpload">
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">拖动图片到这里或者 <em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">提示 : 一次只可上传一个文件</div>
      </template>
    </el-upload>
  </el-dialog>
</template>

<script setup>
import { UploadFilled } from '@element-plus/icons-vue';
import { toRef, ref } from 'vue';

const props = defineProps({
  visiable: Boolean,
  title: String,
  key: String,
});
const visiable = toRef(props, 'visiable');
const emit = defineEmits();
const worker = ref(null); //开启webworker任务
const chunkSize = 1 * 1024 * 1024; //单个切片大小1M

// 文件切片
const handlefileChunks = (file) => {
  let startFileIndex = ref(0); //开始切割索引
  const fileChunkList = ref([]); //切片存入数组
  let index = 0; //唯一标志，用于后续后端合并时候排序
  while (startFileIndex.value < file.size) {
    // 文件可以直接使用slice进行切割
    const endFileIndex = Math.min(startFileIndex.value + chunkSize, file.size);
    const curChunkFile = file.slice(startFileIndex.value,endFileIndex);
    fileChunkList.value.push({
      id:index,
      chunkfile:curChunkFile,
      uploaded:false
    });
    index++;
    startFileIndex.value += chunkSize;
  }
  return fileChunkList.value
};
// 文件md5处理
const handleFileHash = (file) => {
  if (!file) return;
  worker.value = new Worker(new URL('../worker.js', import.meta.url), {
    type: 'module',
  });
  // 发送文件再webworker中进行md5处理
  worker.value.postMessage(file);
  worker.value.onmessage = (event) => {
    // 主线程监听数据
    const fileHash = event.data;
    console.log('🚀 ~ handleFileHash ~ fileHash:', fileHash);
    // 处理分片
    const fileChunks = handlefileChunks(file)
    console.log("🚀 ~ handleFileHash ~ fileChunks:", fileChunks)
    // 发送验证请求
  };
};
// 处理上传
const handleUpload = (options) => {
  const { file } = options;
  console.log('🚀 ~ handleUpload ~ file:', file);
  handleFileHash(file);
};
// 关闭弹窗
const handleClose = () => {
  emit('update:visiable', false);
};
</script>

<style lang="less" scoped></style>
