/**
 * @description 播放器的相关的业务和逻辑，
 * @author senlin
 */
import { Model, Effect } from 'dva-core-ts';
import { Reducer } from 'redux';
import { RootState } from './index';
import { SongProps } from '@/utils/formatSong'
import { message } from 'antd';

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
  randomPlaylist: SongProps[] // 随机播放打乱的列表
  playIndex: number // 正在播放的歌曲列表中的index
  playMode: IPlayMode
  currentTime: number
  totalTime: number
  buffered: number // 当前歌曲的缓存位置，有可能有bug，盲写的
  volume: number
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
    changePlayMode: Effect;
    changeVolume: Effect;
  };
}

const initialState: PlayState = {
  audioEle: null,
  playing: false,
  playlist: [],
  randomPlaylist: [],
  playIndex: -1,
  playMode: IPlayMode.cir,
  currentTime: 0,
  totalTime: 0,
  buffered: 0,
  volume: 1
}

let isNewMark = false // 这个是无奈之举，如果是新的需要加载的歌曲就是true，

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
      const { playlist, playMode, randomPlaylist } = yield select((state: RootState)=> state.play)
      const currentIndex = playlist.findIndex((play: SongProps) => play.id === song.id)
      if (currentIndex < 0) { // 代表列表中没有这歌曲
        isNewMark = true
        yield put({
          type: "setState",
          payload: {
            playing: true,
            playlist: [...playlist,song],
            randomPlaylist: playMode === 2 ? [...randomPlaylist, song] : [], // 这个地方不应该这么写，但是我偷懒了，暂时这样吧
            playIndex: playlist.length,
            currentTime: 0,
            buffered: 0
          }
        })
        handlePlay(song.songPath)
      } else {
        isNewMark = false
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
      isNewMark = false
      const {playlist, playIndex, playMode, audioEle, randomPlaylist } = yield select((state: RootState)=> state.play)
      if (playMode === 1) {
        audioEle.currentTime = 0
        audioEle.play()
        return 
      }
      let resultIndex = playIndex
      if (playIndex < playlist.length - 1) {
        resultIndex ++
      } else {
        resultIndex = 0
      }
      yield put({
        type: "setState",
        payload: {
          playing: true,
          playIndex: resultIndex
        }
      })
      handlePlay(playMode === 2 ? randomPlaylist[resultIndex].songPath : playlist[resultIndex].songPath)
    },
    *preMusic(_, { put, select }) {
      isNewMark = false
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
    *changePlayMode({ payload }, { put, select }) {
      let { playlist, randomPlaylist, playIndex, audioEle } = yield select((state: RootState)=> state.play)
      console.log(audioEle.src);
      console.log(playlist);
      
      // 如果 playMode 为2的话就是随机播放了,如果当前没有播放列表也就不用操作
      if (payload.playMode && payload.playMode === 2 && playlist.length) {
        randomPlaylist = [...playlist].sort(() => Math.random() - 0.5); // 得到打乱的歌曲数组
        playIndex = randomPlaylist.findIndex((play: SongProps) => play.songPath === audioEle.src);
      } else if (payload.playMode && payload.playMode === 0) {  // 如果是循环播放的话
        playIndex = playlist.findIndex((play: SongProps) => play.songPath === audioEle.src);
        randomPlaylist = [] // 清空掉随机列表
      }
      yield put({
        type: 'setState',
        payload: {
          ...payload,
          randomPlaylist,
          playIndex
        }
      })
    },
    /**
     * @description 点击大小声，改变volume值用于页面显示和设置音量，然后存在localStorage里。
     *    audio初始化的时候取出值赋值给audio的音量和volume。
     */
    *changeVolume({ payload }, { put, select }) {
      const { audioEle } = yield select((state: RootState)=> state.play)
      const currenVolume = audioEle.volume
      if ((currenVolume === 1 && payload.action === 1) || (currenVolume === 0 && payload.action === 0)) return
      const resVolume = (payload.action ? currenVolume + 0.1 : currenVolume - 0.1).toFixed(1)
      audioEle.volume = resVolume
      localStorage.setItem('volume', resVolume)
      yield put({
        type: 'setState',
        payload: {
          volume: resVolume
        }
      })
    },
    // 这里是初始化audio，获取当前播放时间啊，自动播放啊什么的靠的就是这里了
    *initAudio({ payload: dispatch }, { put, select }) {
      const { audioEle, buffered } = yield select((state: RootState)=> state.play)
      const volume = localStorage.getItem('volume')
      const resVolume = volume ? Number(volume) : 1
      yield put({
        type: 'setState',
        payload: {
          volume: resVolume
        }
      })
      audioEle.volume = resVolume
      const key = 'play'
      audioEle.onloadstart = () => {
        isNewMark && message.loading({ content: '正在加载歌曲,别急~', key, duration: 10 });
      } 
      audioEle.onplaying = () => {
        isNewMark && message.success({ content: '加载完成，正在播放', key, duration: 1 });
      }
      audioEle.onprogress = () => { // 在这里做缓存条的逻辑，复杂功能，后面写
        //  console.log(audioEle.buffered); 
        
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
      audioEle.onerror = () => {
        message.error({ content: '不知道什么原因，播放失败了', key, duration: 1 });
      }
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