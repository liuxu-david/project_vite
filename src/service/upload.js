import request from "./index";

export const verifyChunks = (data) => {
  return request({
    url: "api/verify",
    method: "POST",
    data,
  });
};

export const uploadChunks = (data) => {
  return request({
    url: "/api/upload",
    method: "POST",
    data,
  });
};
export const mergeChunks = (data) => {
  return request({
    url: "/api/merge",
    method: "POST",
    data,
  });
};
