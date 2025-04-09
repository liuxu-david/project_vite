<template>
  <el-upload
    v-model:file-list="fileList"
    class="upload-demo"
    :http-request="handleRequest"
    multiple
    :limit="3"
    :on-exceed="handleExceed"
  >
    <el-button type="primary">点击上传</el-button>
  </el-upload>
</template>

<script setup>
// import { uploadFile } from '@/service/uploadMore.js';
import { ref } from 'vue';

const fileList = ref([]);

// 阻止默认上传行为
// const handleBeforeUpload = (file) =>{
//   fileList.value.push(file)
//   return false
// }
const handleRequest = async (options) => {
  const { file } = options;
  const formData = new FormData();
  // fileList.value.forEach((file) => {
  //   formData.append('bbb', file.raw); 
  // });
  formData.append('bbb', file)
  formData.append('name', 'david');
  formData.append('age', 18);
  try {
    await uploadFile(formData);
  } catch (error) {}
};
</script>

<style lang="less" scoped></style>
