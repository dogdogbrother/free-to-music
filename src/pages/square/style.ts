import styled from'styled-components';

export const Wrap = styled.div`
  
`

export const Publish = styled.div`
  @media (min-width: 640px) {
    display: flex;
  }
  @media (max-width: 640px) {
    
  }
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
  width: 100%;
  margin-bottom: 20px;
  /* background-color: red; */
  border: solid 1px rgba(99,99,99,0.1);
  box-shadow: 0 2px 10px rgba(99,99,99,0.1);
`

export const UserHeader = styled.div`
  padding: 10px 10px 0 10px;
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
  padding: 10px 10px 0 70px;
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

export const PublishBtns = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media (min-width: 640px) {
    display: flex;
  }
  @media (max-width: 640px) {
    
  }
`

export const FootBtn = styled.div`
  display: flex;
  line-height: 34px;
  border-top: 1px solid #ebebeb;
  div {
    width: 50%;
    text-align: center;
    position: relative;
    color: #9b9b9b;
    &:nth-child(1):after {
      content: "";
      position: absolute;
      top: 50%;
      right: 0;
      margin-top: -1rem;
      width: 1px;
      height: 2rem;
      background-color: #ebebeb;
    }
  }
`

export const InsetImageBox = styled.div`
  display: flex;
  .inset-image{
    width: 80px;
    height: 80px;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    &:hover .delete{
      display: block;
    }
  }
  .delete{
    position: absolute;
    top: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    width: 24px;
    height: 24px;
    border-radius: 50px;
    border-color: rgba(255, 255, 255, 0.5);
    text-align: center;
    cursor: pointer;
    display: none;
  }
  .iconfont {
    color: rgba(255, 255, 255, 0.6);;
    font-size: 20px;
    line-height: 24px;
  }
`

export const FileContainer = styled.div`
  position: relative;
  width: 90px;
  height: 22px;
  .file-btn{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 4;
  }
  input {
    cursor: pointer;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 5;
    font-size: 0;
    opacity: 0;
  }
`
export const CommentBox = styled.div`
  padding: 10px;
  border-top: 1px solid #ebebeb;
`
export const UserComment = styled.div`
  display: flex;
`
export const CommentAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`
export const CommentList = styled.ul`
  padding-left: 40px;
`

export const Comment = styled.li`
  display: flex;
  padding: 10px 0;
  

`

export const CommentContent = styled.div`
  flex: 1;
  border-bottom: 1px solid #f1f1f1;
  padding-bottom: 15px;
  .info {
    span {
      color: #8a9aa9;
    }
  }
  .content {
    padding: 10px 0;
  }
  .footnote {
    display: flex;
    justify-content: space-between;
    color: #8a9aa9;
    .m-r-10 {
      margin-right: 30px;
    }
  }
`