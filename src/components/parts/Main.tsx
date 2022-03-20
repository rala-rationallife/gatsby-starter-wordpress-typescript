import * as React from "react"
import styled from "styled-components"

type Props = {
  children: any
}

const StyledMain = styled.main`
  background-color: var(--background);
  padding-block: 30px;
`

export const Main: React.VFC<Props> = ({ children }) => {
  return <StyledMain className="myContainer">{children}</StyledMain>
}
