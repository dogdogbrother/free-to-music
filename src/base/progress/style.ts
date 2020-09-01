import styled from'styled-components';

export const Wrap = styled.div`
  margin-top: 13px;
  margin-left: 13px;
  max-width: 900px;
  min-width: 200px;
  width: 60%;
  height: 4px;
  background-color: rgba(99,99,99,0.1);
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  z-index: 1;
`

export const Load = styled.div`
  height: 100%;
  width: 0;
  border-radius: 4px;
  position: absolute;
  background-color: rgba(99,99,99,0.3);
  z-index: 2;
`

export const Played = styled.div`
  position: absolute;
  z-index: 3;
  height: 100%;
  right: 100%;
  left: 0;
  background-color: green;
`

export const Dot = styled.div`
  position: absolute;
  left: 100%;
  top: -4px;
  z-index: 4;
  height: 12px;
  width: 12px;
  border-radius: 50px;
  background-color: black;
`