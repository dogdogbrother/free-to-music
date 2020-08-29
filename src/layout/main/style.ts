import styled from'styled-components';

export const Wrap = styled.section`
  width: 100%;
  flex: 1;
  box-sizing: border-box;
  padding:20px;
  padding-bottom: 0;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width : 8px;
    height: 1px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
    background   : rgba(0, 0, 0, 0.2);
  }
  &::-webkit-scrollbar-track {
    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 50px;
    background   : rgba(100, 100, 100, 0.2); 
  }
`