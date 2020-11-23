import styled from'styled-components';

export const PlayerWrap = styled.div`
  position:fixed;
  z-index: 2;
  right: 0;
  bottom: 0;
  left: 210px;
  height: 60px;
  padding-top: 20px;
  background-color: rgba(150, 150, 150, 0.2);
  display: flex;
  @media (max-width: 640px) {
    left: 0;
  } 
`

export const PlayerBtns = styled.div`
  display: flex;
  justify-content: space-between;
  width: 120px;
  margin-right: 10px;
  i{
    font-size: 30px;
    cursor: pointer;
  }
`
export const PlayeMode = styled.div`
  width: 30px;
  i{
    font-size: 30px;
    cursor: pointer;
  }
`

export const VolumeBtns = styled.div`
  margin-left: 10px;
  display: flex;
  line-height: 30px;
  user-select: none;
  span {
    margin-right: 10px;
    font-size: 16px;
  }
`
export const Github = styled.div`
  cursor: pointer;
  position: absolute;
  top: 27px;
  right: 20px;
  @media (max-width: 1200px) {
    display: none
  } 
`