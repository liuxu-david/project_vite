import request from "./index"

export const uploadFile= data =>{
  return request({
    url: "/api/upload/aaa",
    method: "POST",
    data,
    headers: {
      // 可以不配置
      "Content-Type": "multipart/form-data"
    }
  })
}