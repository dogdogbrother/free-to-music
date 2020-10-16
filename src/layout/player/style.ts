import styled from'styled-components';

export const PlayerWrap = styled.div`
  position:fixed;
  right: 0;
  bottom: 0;
  left: 210px;
  height: 60px;
  padding-top: 20px;
  background-color: rgba(0,0,0,0.1);
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