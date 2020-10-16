import styled from'styled-components';
const COMMON_STYLE = `
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`
export const BgImg = styled.div`
  ${COMMON_STYLE}
  z-index: 1;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  filter: blur(12px);
  opacity: 0.3;
  transition: all 0.8s;
`