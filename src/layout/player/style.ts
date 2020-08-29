import styled from'styled-components';

export const PlayerWrap = styled.div`
  position:fixed;
  right: 0;
  bottom: 0;
  left: 210px;
  height: 80px;
  background-color: rgba(0,0,0,0.1);
`

export const PlayerBtns = styled.div`
  display: flex;
  justify-content: space-between;
  width: 120px;
  i{
    font-size: 30px;
    cursor: pointer;
  }
`