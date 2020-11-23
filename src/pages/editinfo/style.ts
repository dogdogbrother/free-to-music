import styled from'styled-components';

export const Wrap = styled.div`
  height: 100%;
`

export const InfoItem = styled.li`
  width: 80%;
  max-width: 900px;
  min-width: 600px;
  border-bottom: 1px solid #ccc;
  padding: 20px 10px;
  display: flex;
  .label {
    font-weight: bold;
    margin-right: 40px;
  }
  img {
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }
`