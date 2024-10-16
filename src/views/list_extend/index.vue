<script setup>
  import { reactive } from "vue";
  const tableData = reactive([]);
  // console.time();
  // for (let i = 0; i < 5000; i++) {
  //   tableData.push({
  //     id: i,
  //     name: `test${i}`,
  //     age: 18 + i,
  //     address: "河南",
  //   });
  // }
  // console.timeEnd();

  // 使用时间分片渲染数据
  let index = 0;
  function sliceTask() {
    requestAnimationFrame(() => {
      let target = index + 200;
      for (; index < target; index++) {
        tableData.push({
          id: index,
          name: `test${index}`,
          age: 18 + index,
          address: "河南",
        });
      }
      if (target < 10000) {
        sliceTask();
      }
    });
  }
  sliceTask();
</script>

<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="name" label="Date" width="180" />
      <el-table-column prop="age" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
    <!-- <table>
      <tr v-for="item in tableData" :key="item.id">
        <td>{{ item.name }}</td>
        <td>{{ item.age }}</td>
        <td>{{ item.address }}</td>
      </tr>
    </table> -->
  </div>
</template>

<style scoped lang="less"></style>
