import SparkMD5 from "spark-md5"

onmessage = (event)=>{
  const file = event.data
  const fileReader = new FileReader()
  fileReader.readAsArrayBuffer(file)
  fileReader.onload=(e)=>{
    const spark = new SparkMD5.ArrayBuffer()
    spark.append(e.target.result)
    const target = spark.end()
    // 发送数据
    postMessage(target)
  }
}