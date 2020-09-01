/**
 * @description 用于保存用户操作的，例如我网易云搜索过什么
 * @author senlin
 */
import { Model } from 'dva-core-ts';
import { Reducer } from 'redux';
import { SongProps } from '@/utils/formatSong'

export interface KeepState {
  wyySongs: SongProps[],  
  wyySearch: string,
  mySongs: SongProps[],  
  mySearch: string,
}

interface KeepModel extends Model {
  namespace: 'keep',
  reducers: {
    setState: Reducer;
  },
}

const initialState = {
  wyySongs: [],  
  wyySearch: '',
  mySongs: [],  
  mySearch: '',
}

const keepModel: KeepModel = {
  namespace: 'keep',
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

export default keepModel