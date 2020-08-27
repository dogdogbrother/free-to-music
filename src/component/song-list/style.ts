import styled from'styled-components';

export const SongWrap = styled.ul`
  
`

export const Song = styled.li`
  display: flex;
  font-size: 18px;
  padding: 10px 0;
  .singer,.album{
    width: 20%;
  }
`

export const LikeIcon = styled.i`
  cursor: pointer;
  margin-right:5px;
  &:hover{
    color: red;
  }
`

export const SongMain = styled.div`
  display: flex;
  width: 60%;
  justify-content: space-between;
`

export const Icons = styled.div`
  margin-right: 20px;
`

export const PlayIcon = styled.i`
  &.iconfont{
    font-size: 24px;
  }
`
