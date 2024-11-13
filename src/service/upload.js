import request from "./index";

export const verifyChunks = (data) => {
  return request({
    url: "/api/upload/verify",
    method: "POST",
    data,
  });
};

export const uploadChunks = (data) => {
  return request({
    url: "/api/upload/upload",
    method: "POST",
    data,
  });
};
export const mergeChunks = (data) => {
  return request({
    url: "/api/upload/merge",
    method: "POST",
    data,
  });
};
