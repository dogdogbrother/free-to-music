import styled from'styled-components';

export const Wrap = styled.main`
  padding: 20px;
`
export const UserInfo = styled.section`
  background-color: #fff;
  /* width: 80%;
  max-width: 800px;
  min-width: 400px; */
  padding: 10px;
  display: flex;
  margin-bottom: 20px;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .info {
    padding: 10px 20px;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .name {
      font-size: 18px;
      font-weight: 600;
      line-height: 32px;
    }
    .signature {
      line-height: 28px;
    }
  }
  .btn {
    padding-top: 39px;
    margin-right: 20px;
  }
  .follow {
    padding: 30px 10px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    p {
      cursor: pointer;
      font-size: 16px;
    }
  }
`

