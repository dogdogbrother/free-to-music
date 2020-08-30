/**
 * @description 用于个人信息的管理
 * @author senlin
 */

import axios from 'axios'
import { Model, Effect } from 'dva-core-ts';
import { Reducer } from 'redux';

const GET_INFO_URL = '/api/user/info'
const LOGOUT_URL = '/api/user/logout'

export interface UserState {
  userName: string,  
  nickName: string, 
  avatar: string, 
  id: number,
  likes: number[],
}

interface UserModel extends Model {
  namespace: 'user',
  reducers: {
    setState: Reducer<UserState>;
  };
  effects: {
    getInfo: Effect;
    logout: Effect;
  }
}

const initialState  = {
  userName: '',  
  nickName: '', 
  avatar: '', 
  id: 0,
  likes: [],
}

const userModel: UserModel = {
  namespace: 'user',
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
    *getInfo(_,{ call, put }) {
      const { data } = yield call(axios.get, GET_INFO_URL)
      yield put({
        type: 'setState',
        payload: data || initialState,
      })
    },
    *logout(_,{ call, put }) {
      const { code } = yield call(axios.get, LOGOUT_URL)
      if (code) {
        yield put({
          type: 'setState',
          payload: initialState,
        })
      }
    }
  }
}

export default userModel