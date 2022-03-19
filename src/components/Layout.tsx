import * as React from "react"

type Props = {
  children: any
}

export const Layout: React.VFC<Props> = ({ children }) => {
  return <>{children}</>
}
