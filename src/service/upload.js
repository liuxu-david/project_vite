import request from "./index";
export const uploadChunk = (data) => {
  return request({
    url: "/api/upload",
    method: "POST",
    data: data,
  });
};
