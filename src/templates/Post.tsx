import * as React from "react"
import { PageProps } from "gatsby"
import { Layout } from "../components/Layout"
import { Seo } from "../components/Seo"
import { Main } from "../components/parts/Main"

const Post = ({ location }: PageProps) => {
  return (
    <Layout>
      <Seo pagepath={location.pathname} />
      <Main>
        <div className="myGrid">Hello</div>
      </Main>
    </Layout>
  )
}

export default Post
