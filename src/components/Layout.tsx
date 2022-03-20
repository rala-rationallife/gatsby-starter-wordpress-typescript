import * as React from "react"
import { Header } from "./Header"
import { GlobalStyle } from "./Styles"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import { Footer } from "./Footer"

config.autoAddCss = false

type Props = {
  children: any
}

export const Layout: React.VFC<Props> = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      {children}
      <Footer />
    </>
  )
}
