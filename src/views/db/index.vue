<script setup>
import { ref } from 'vue';
import { getAllInfo } from '@/service/db.js';
// import { uploadFile } from '@/service/test.js';

let data = ref([]);
let fileListfileList = ref([]);
const handleGetAllInfo = async () => {
  const res = await getAllInfo();
  data.value = res.data;
};

const customUpload = async (options) => {
  const { file } = options; // 获取文件
  // 使用 FormData 构建上传数据
  const formData = new FormData();
  console.log(file);
  formData.append('aaa', file);
  try {
    // await uploadFile(formData);
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div>
    <el-button type="primary" @click="handleGetAllInfo">发起网络请求</el-button>
    <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      :http-request="customUpload"
      multiple
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :limit="3"
      :on-exceed="handleExceed"
    >
      <el-button type="primary">点击上传</el-button>
    </el-upload>

    <h1>{{ data }}</h1>
  </div>
</template>

<style scoped></style>
