<script setup>
  import { reactive, ref } from "vue";
  import SparkMD5 from "spark-md5";
  import { verifyChunks, uploadChunks, mergeChunks } from "@/service/upload.js";

  const inputRef = ref("");
  const fileList = reactive([]); //分片后的数组
  const fileSize = ref(1 * 1024 * 1024); //1m/片
  const fileHash = ref(""); //文件hash值 为了后续文件合并
  const fileName = ref(""); //文件名称
  let startIndex = ref(0); //切割开始索引
  let index = ref(0); //文件标识

  // 处理文件的分片
  const handleChunks = (file) => {
    while (startIndex.value < file.size) {
      const endIndex = Math.min(startIndex.value + fileSize.value, file.size);
      const curFile = file.slice(startIndex.value, endIndex);
      fileList.push({
        file: curFile,
        chunkIndex: index.value,
        uploaded: false,
        fileHash: fileHash.value,
      });
      index.value++;
      startIndex.value += fileSize.value;
    }
    return fileList;
  };
  // 处理生成hash值
  const handleFileHash = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const targetHash = SparkMD5.ArrayBuffer.hash(e.target.result);
        resolve(targetHash);
      };
    });
  };
  // 检查切片 秒传，断点续传
  const handleVerifyChunks = async (chunks) => {
    try {
      const { code, msg, data } = await verifyChunks({
        fileName: fileName.value,
        fileHash: fileHash.value,
      });
      console.log("msg", msg, code, data);
      if (code === 206) {
        data.forEach((chunkIndex) => {
          chunks[Number(chunkIndex)].uploaded = true;
        });
        return chunks.filter((chunk) => !chunk.uploaded);
      } else if (code === 404) {
        return chunks;
      } else {
        return [];
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  // 处理上传分片
  // 单个分片的上传
  const handleUploadChunk = async (chunk) => {
    return new Promise(async (resolve, reject) => {
      try {
        let fd = new FormData();
        fd.append("file", chunk.file);
        fd.append("fileHash", chunk.fileHash);
        fd.append("chunkIndex", chunk.chunkIndex);
        const result = await uploadChunks(fd);
        console.log(result);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  };
  // 多个分片上传
  const handleUploadChunks = async (chunks, maxRequest = 6) => {
    // 控制并发上传数目
    if (!chunks.length) return [];
    return new Promise(async (resolve, reject) => {
      let requestStartIndex = 0;
      const requestSuccess = [];
      const requestFail = [];
      const handleConcurrent = async () => {
        if (requestStartIndex >= chunks.length) {
          return resolve(requestSuccess);
        }
        const requestArr = chunks.slice(
          requestStartIndex,
          Math.min(requestStartIndex + maxRequest, chunks.length)
        );
        try {
          const res = await Promise.all(
            requestArr.map((requestItem) => handleUploadChunk(requestItem))
          );
          requestStartIndex += requestArr.length;
          requestSuccess.push(...(Array.isArray(res) ? res : []));
          await handleConcurrent();
        } catch (error) {
          requestFail.push(...(Array.isArray(error) ? error : []));
          reject(Array.isArray(error) ? error : []);
        }
      };
      await handleConcurrent();
    });
  };
  // 分片上传完毕处理合并
  const handleMergeChunks = async () => {
    try {
      const data = {
        chunkHash: fileHash.value,
        fileName: fileName.value,
        chunksNumber: fileList.length,
      };
      console.log("******data", data);
      const result = await mergeChunks(data);
      return result;
    } catch (err) {
      console.log("上传失败", err);
    }
  };
  // 文件上传处理
  const handleUpload = async (event) => {
    try {
      const file = event.target.files[0];
      console.log("******file", event.target.files);

      fileName.value = file.name;
      // 获取文件hash
      fileHash.value = await handleFileHash(file);
      // 处理切片
      const chunks = handleChunks(file);
      // 检验文切片是否已经存在
      const verifyChunksResult = await handleVerifyChunks(chunks);
      console.log("检查切片结果", verifyChunksResult);
      if (verifyChunksResult.length) {
        // 上传切片
        const result = await handleUploadChunks(verifyChunksResult);
        console.log("切片上传成功", result);
        // 合并切片
        await handleMergeChunks();
        console.log("大文件上传成功");
      }
    } catch (error) {
      console.log("大文件上传失败");
    }
  };
</script>

<template>
  <input type="file" @change="handleUpload" ref="inputRef" />
</template>

<style scoped></style>
