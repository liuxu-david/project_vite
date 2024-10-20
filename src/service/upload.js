import request from "./index";

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
