import request from './index';

export const getAllInfo = () => {
  return request({
    url: "/api/user/getAll",
    method: "Get",
  });
};
