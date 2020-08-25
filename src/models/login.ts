/**
 * @description 用于注册登陆的dialog状态，和里面的登陆注册啥的
 */
import { Model, Effect } from 'dva-core-ts';
import { Reducer } from 'redux';
import axios from 'axios'

const LOGIN_URL = '/api/user/login'

type actionType = 'login' | 'register'

export interface loginState {
  status: boolean,  
  type: actionType,
}

interface LoginModel extends Model {
  namespace: 'login',
  reducers: {
    setState: Reducer<loginState>;
  },
  effects: {
    changeStatus: Effect;
    login: Effect;
  }
}

const initialState = {
  loginStatus: false,
  type: 'login'
}

const loginModel: LoginModel = {
  namespace: 'login',
  state: initialState,
  reducers: {
    setState(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: {
    *changeStatus({ payload },{ put }) {
      yield put({
        type: 'setState',
        payload
      })
    },
    *login({ payload },{ call, put }) {
      try {
         const { data } = yield call(axios.post, LOGIN_URL, payload)
         yield put({
           type: 'setState',
           payload: {
            loginStatus: false
           }
         })
         yield put({
          type: 'user/setState',
          payload: data
        })
      } catch(e) {}
    }
  }
}

export default loginModel
