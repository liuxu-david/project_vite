import request from "./index";

// 文件上传检验接口
export const verifyFile_API = (data) => {
    return request({
        url: "/api/upload/verify",
        method: "POST",
        data,
    });
};

export const uploadFile_API = (data) => {
    return request({
        url: "/api/upload",
        method: "POST",
        data,
        headers: {
            // 可以不配置
            "Content-Type": "multipart/form-data",
        },
    });
};
