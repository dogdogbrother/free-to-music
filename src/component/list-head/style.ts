import styled from'styled-components';

export const Wrap = styled.div`
  
`

export const EmptyWrap = styled.div`
  width: 220px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    width: 200px;
    border-radius: 30px;
    margin-bottom: 20px;
  }
  h4 {
    text-align: center;
    font-size: 24px;
    color: #666;
  }
`
export const Link = styled.span`
  cursor: pointer;
  color: #999;
  font-size: 20px;
  margin-left: 10px;
  text-decoration: underline;
`
export const Header = styled.ul`
  display: flex;
  padding: 10px 0;
  li{
    width: 60%;
  }
  .singer,.album{
    width: 20%;
  }
`

