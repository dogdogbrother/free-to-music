import styled from'styled-components';

export const Wrap = styled.div`
  display: flex;
`
export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`

export const UserName = styled.span`
  flex: 1;
  line-height: 40px;
`

export const PopoverList = styled.ul`
  li {
    cursor: pointer;
    line-height: 1.8;
    margin: 0 5px;
    color: #555;
    a {
      color: #555;
    }
    &:hover,a:hover{
      color: #222;
    }
  }
`