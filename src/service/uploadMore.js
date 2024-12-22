import request from "./index";

// 文件上传检验接口
export const verifyFile_API = (data) => {
    return request({
        url: "/api/upload/verify",
        method: "POST",
        data,
    });
};
// 上传接口
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
// 合并接口
export const mergeFile_API = (data) => {
    return request({
        url: "/api/upload/merge",
        method: "POST",
        data,
    });
};

// 上传图片临时校验
export const getSignature_API = () => {
    return request({
        url: "/api/upload/image",
        method: "Get",
    });
};

export const uploadImageToOBS_API = (url, data) => {
    return request({
        url,
        method: "POST",
        data,
    });
};
