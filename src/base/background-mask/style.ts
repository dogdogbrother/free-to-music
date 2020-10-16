import styled from'styled-components';
const COMMON_STYLE = `
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
`
export const Wrap = styled.div`
  ${COMMON_STYLE}
`
export const BgImg = styled.div`
  ${COMMON_STYLE}
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  filter: blur(12px);
  opacity: 0.7;
  transition: all 0.8s;
`

export const Mask = styled.div`
  ${COMMON_STYLE}
  z-index: -2;
  background-color: rgba(0, 0, 0, 0.5);;
`