import styled from'styled-components';

export const Wrap = styled.section`
  height: 100%;
  width: 210px;
  background-color: #f4f4f4;
  box-sizing: border-box;
  padding: 20px 30px;
`

export const LinkBox = styled.section`
  padding: 20px 0px;
  a {
    text-decoration: none;
    color: #333;
    display: block;
    line-height: 28px;
    font-size: 16px;
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 0 10px;
  }
  a:not(.active):hover{
    background-color: #e1e1e1;
  }
  .active {
    color: #fff;
    background-color: #1ecc95;
  }
`