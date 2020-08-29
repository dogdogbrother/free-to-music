import styled from'styled-components';

export const Wrap = styled.div`
  
`

export const Publish = styled.div`
  display: flex;
`
export const TextDecorate = styled.div`
  max-width: 600px;
  min-width: 300px;
  width: 100%;
  background-color: #f8f8f8;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #f8f8f8;
  &.border {
    border: 1px solid #007fff;
  }
  margin-right: 20px;
`

export const CountString = styled.div`
  text-align: right;
  padding: 10px;
  color: #999;
`
export const List = styled.ul`
  padding: 20px 20px 0 20px;
`

export const Dynamic = styled.li`
  padding: 10px;
  width: 100%;
  margin-bottom: 20px;
  /* background-color: red; */
  border: solid 1px rgba(99,99,99,0.1);
  box-shadow: 0 2px 10px rgba(99,99,99,0.1);
`

export const UserHeader = styled.div`
  display: flex;
`
export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .user-name {
    font-weight: bold;
  }
  .describe {
    color: #999;
  }
`

export const Content = styled.div`
  padding: 10px 10px 0 60px;
`

export const Link = styled.span`
  cursor: pointer;
  color: #1890ff;
`

export const DynamicImage = styled.img`
  height: 80px;
  width: auto;
  margin-right: 10px;
`