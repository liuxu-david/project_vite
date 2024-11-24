<script setup>
import { ref } from 'vue';
import { getAllInfo } from '@/service/db.js';

let data = ref([])
const handleGetAllInfo = async()=>{
  const res = await getAllInfo()
  data.value = res.data
}
</script>

<template>
  <div>
    <el-button type="primary" @click="handleGetAllInfo">发起网络请求</el-button>
    <h1>{{data}}</h1>
  </div>
</template>

<style scoped></style>
