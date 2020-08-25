import { Model } from 'dva-core-ts';
import { Reducer } from 'redux';

interface UserState {
  userName: string,  
  nickName: string, 
  avatar: string, 
  id: number,
}

interface UserModel extends Model {
  namespace: 'user',
  reducers: {
    setState: Reducer<UserState>;
  };
}

const initialState  = {
  userName: '',  
  nickName: '', 
  avatar: '', 
  id: 0,
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
  }
}

export default userModel