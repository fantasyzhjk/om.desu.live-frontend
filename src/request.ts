import axios from "axios";

//创建axios的一个实例
var instance = axios.create({
  baseURL: "https://api.desu.life/", //接口统一域名
  timeout: 6000, //设置超时
  headers: {
    "Content-Type": "application/json;charset=UTF-8;",
  },
});
//正在请求的数量
let requestCount = 0;

//请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // const token = window.localStorage.getItem('token');
    // token && (config.headers.Authorization = token)
    //若请求方式为post，则将data参数转为JSON字符串
    if (config.method === "POST") {
      config.data = JSON.stringify(config.data);
    }
    return config;
  },
  (error) =>
    // 对请求错误做些什么
    Promise.reject(error)
);

//响应拦截器
instance.interceptors.response.use(
  (response) => {
    //响应成功
    return response.data;
  },
  (error) => {
    console.log(error);
    //响应错误
    return Promise.reject(error);
  }
);

/**
 * @param {String} method  请求的方法：get、post、delete、put
 * @param {String} url     请求的url:
 * @param {Object} data    请求的参数
 * @param {Object} config  请求的配置
 * @returns {Promise}     返回一个promise对象，其实就相当于axios请求数据的返回值
 */

const request = ({ method, url, data, config }) => {
  method = method.toLowerCase();

  if (method == "delete") {
    return instance.delete(url, {
      params: data,
      ...config,
    });
  } else if (method == "put") {
    return instance.put(url, data, { ...config });
  } else if (method == "post") {
    return instance.post(url, data, { ...config });
  } else if (method == "get") {
    return instance.get(url, {
      params: data,
      ...config,
    });
  } else {
    // 默认get请求
    return instance.get(url, {
      params: data,
      ...config,
    });
  }
};
export default request;
