import axios from 'axios';
import { message } from 'antd';

axios.interceptors.response.use(
  function (response) {
    return {
      code: 200,
      data: response.data
    };
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      return message.error('清先登陆');
    }
    return message.error(error.response ? error.response.data : '发生错误');
    // return Promise.reject({
    //   code: error.response ? error.response.status : 500,
    //   data: error.response ? error.response.data : '发生错误'
    // })
  },
);