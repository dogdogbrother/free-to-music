/**
 * @description 播放器的相关的业务和逻辑，
 * @author senlin
 */
import { Model, Effect } from 'dva-core-ts';
import { Reducer } from 'redux';
import { RootState } from './index';
import { SongProps } from '@/utils/formatSong'

interface IAudioProps {
  src: string,
  play: ()=> void
}

let audioQuote: IAudioProps = {  // 用于 model 外的函数调用
  src: '',
  play(){}
} 

export enum IPlayMode {
  cir,  // 循环播放
  single, // 单曲播放
  random  // 随机播放
}

export interface PlayState {
  audioEle: null
  playing: boolean  // 播放状态
  playlist: SongProps[] // 正在播放的歌曲列表
  playIndex: number // 正在播放的歌曲列表中的index
  playMode: IPlayMode
  currentTime: number
  totalTime: number
  buffered: number // 当前歌曲的缓存位置，有可能有bug，盲写的
}

interface PlayModel extends Model {
  namespace: 'play';
  state: PlayState;
  reducers: {
    setState: Reducer;
    audio: Reducer;
  };
  effects: {
    requestMusic: Effect;
    nextMusic: Effect;
    preMusic: Effect;
    pause: Effect;
    play: Effect;
    initAudio: Effect;
    changePlay: Effect;
  };
}

const initialState: PlayState = {
  audioEle: null,
  playing: false,
  playlist: [],
  playIndex: -1,
  playMode: IPlayMode.cir,
  currentTime: 0,
  totalTime: 0,
  buffered: 0,
}

const playModel: PlayModel = {
  namespace: 'play',
  state: initialState,
  reducers: {
    setState(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
    audio(state, { payload }) {
      audioQuote = payload
      return {
        ...state,
        audioEle: payload
      }
    }
  },
  effects: {
    /**
     * @description 点击歌曲列表播放歌曲,逻辑是这样的
     * 1. 判断播放列表里面有没有 播放id，有的话，调整对应的 playindex，没有的话push后playindex = list.length
     * 2. playing 是一定会为 true 的
     */
    *requestMusic({song}, { put, select }) {
      const { playlist, playIndex } = yield select((state: RootState)=> state.play)
      const currentIndex = playlist.findIndex((play: SongProps) => play.id === song.id)
      if (currentIndex < 0) { // 代表列表中没有这歌曲
        yield put({
          type: "setState",
          payload: {
            playing: true,
            playlist: [...playlist,song],
            playIndex: playIndex + 1
          }
        })
        handlePlay(song.songPath)
      } else {
        yield put({
          type: "setState",
          payload: {
            playing: true,
            playIndex: currentIndex
          }
        })
        handlePlay(playlist[currentIndex].songPath)
      }
    },
    *nextMusic(_, { put, select }) {
      const {playlist, playIndex, playMode, audioEle } = yield select((state: RootState)=> state.play)
      console.log(audioEle.currentTime);
      if (playMode === 1) {
        audioEle.currentTime = 0
        audioEle.play()
        return 
      }
      let resultIndex = 0
      if (playIndex < playlist.length - 1) {
        resultIndex += 1
      } 
      yield put({
        type: "setState",
        payload: {
          playing: true,
          playIndex: resultIndex
        }
      })
      handlePlay(playlist[resultIndex].songPath)
    },
    *preMusic(_, { put, select }) {
      const { playlist, playIndex } = yield select((state: RootState)=> state.play)
      let resultIndex = playIndex ? playIndex - 1 : playlist.length - 1
      yield put({
        type: "setState",
        payload: {
          playing: true,
          playIndex: resultIndex
        }
      })
      handlePlay(playlist[resultIndex].songPath)
    },
    *pause(_, { put, select }) {
      const { audioEle } = yield select((state: RootState)=> state.play)
      yield put({
        type: "setState",
        payload: { playing: false }
      })
      audioEle.pause()
    },
    *play(_, { put, select }) {
      const { audioEle, playlist } = yield select((state: RootState)=> state.play)
      if (!playlist.length) return
      yield put({
        type: "setState",
        payload: { playing: true }
      })
      audioEle.play()
    },
    *changePlay({ payload }, { put, select }) { 
      const { audioEle } = yield select((state: RootState)=> state.play)
      audioEle.currentTime = payload.currentTime
      yield put({
        type: 'setState',
        payload
      })
    },
    // 这里是初始化audio，获取当前播放时间啊，自动播放啊什么的靠的就是这里了
    *initAudio({ payload: dispatch }, { put, select }) {
      const { audioEle } = yield select((state: RootState)=> state.play)
      audioEle.onprogress = () => { // 在这里做缓存条的逻辑，复杂功能，后面写
        //  console.log(audioEle.buffered); 
        console.log();
      }
      audioEle.onended = () => {
        dispatch({
          type: "play/nextMusic"
        })
      }
      audioEle.onprogress = () => {
        try {
          if (audioEle.buffered.length > 0) {
            const duration = audioEle.duration
            let buffered = 0
            buffered = audioEle.buffered.end(0) > duration ? duration : audioEle.buffered.end(0)
            dispatch({
              type: "play/setState",
              payload: { buffered }
            })
          }
        } catch (e) {}
      }
      // 开始播放音乐
      audioEle.onplay = () => {

      }
      // 音乐播放出错
      audioEle.onerror = () => {}
      // 获取当前播放时间
      audioEle.ontimeupdate = () => {
        dispatch({
          type: 'play/setState',
          payload: {
            currentTime: audioEle.currentTime,
            totalTime: audioEle.duration
          }
        })
      }
    }
  }
}

/**
 * @description 把歌曲路径传进去，进行播放
 * @param ptah 歌曲路径
 */
function handlePlay(ptah: string) {
  audioQuote.src = ptah
  audioQuote.play()
}

export default playModel