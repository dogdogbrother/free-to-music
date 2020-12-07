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
  line-height: 28px;
  .label {
    font-weight: bold;
    margin-right: 40px;
    display: flex;
    flex: column;
    align-items: center;
    width: 80px;
  }
`

export const FileContainer = styled.div`
  position: relative;
  z-index: 4;
  width: 100px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  input {
    cursor: pointer;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 5;
    opacity: 0;
    left: 0;
  }
`