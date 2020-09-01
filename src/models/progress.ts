/**
 * @description 用于进度条的管理
 * @author senlin
 */

import { Model, Effect } from 'dva-core-ts';
import { Reducer } from 'redux';



interface progressModel extends Model {
  namespace: 'progress',
  reducers: {
    setState: Reducer;
  };
  effects: {
    getInfo: Effect;
  }
}

interface IProgress {
  load: string,
  played: string,
  dot: string,
}

const initialState: IProgress = {
  load: '',  // 根据加载的进度得到的百分比数值
  played: '', // 已经播放的百分比数值
  dot: '', // 滑轨小块的百分比数值
}

const progressModel: progressModel = {
  namespace: 'progress',
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
      
    },
  }
}

export default progressModel