/**
 * @description 单纯的提供了 pointer 和 蓝色的样式
 */
import React, { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}
const styles = {
  color: "#1890ff",
  cursor: "pointer"
}
const Link = (props: IProps) => {
  return <div style={styles}>{props.children}</div>
}

export default Link