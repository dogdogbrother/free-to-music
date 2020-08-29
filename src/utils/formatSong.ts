import { toHttps } from './util'


export interface SongProps {
  id: number,
  songName: string,
  singer: string,
  album: string,
  songPath: string,
  coverPath: string
}

export interface ArtistsProps {
  name: string
}
export interface Album {
  name: string,
  picUrl: string
}

export interface WyySongProps {
  id: number,
  name: string
  artists: ArtistsProps[],
  album: Album,
}

class Song {
  id: number
  songName: string
  singer: string
  album: string
  songPath: string
  coverPath: string
  constructor({ id, songName, singer, album, songPath, coverPath }: SongProps) {
    this.id = id
    this.songName = songName
    this.singer = singer
    this.album = album
    this.songPath = songPath
    this.coverPath = coverPath
  }
}

function filterSinger(singers: ArtistsProps[]) {
  let arr = singers.map(singer => {
    return singer.name
  })
  return arr.join('/')
}

// 歌曲数据格式化
const formatSongs = (list: WyySongProps[]) => {
  return list.filter(item => item.id).map(music => new Song({
    id: music.id,
    songName: music.name,
    singer: filterSinger(music.artists),
    album: music.album.name,
    songPath: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`,
    coverPath: toHttps(music.album.picUrl), // 这个地方现在目前应该都是空的，而且我个人服务器也不是https，有待优化
  }))
}

export default formatSongs