import request from "./request";

export const time = () => {
  return request({
    url: "/time",
    method: "get",
    data: {
      verify: new Date().getTime(),
    },
    config: {},
  });
};

export const download = (params: Object) => {
  return request({
    url: "/download",
    method: "get",
    data: params,
    config: {},
  });
};

export const cache = (params: Object) => {
  return request({
    url: "/cache",
    method: "get",
    data: params,
    config: {},
  });
};
