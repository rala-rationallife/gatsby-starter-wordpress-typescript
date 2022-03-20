import * as React from "react"
import { PageProps } from "gatsby"
import { Layout } from "../components/Layout"
import { Seo } from "../components/Seo"
import { Main } from "../components/parts/Main"

const CatList = ({ location }: PageProps) => {
  return (
    <Layout>
      <Seo pagepath={location.pathname} />
      <Main>
        <div className="myGrid">Category List</div>
      </Main>
    </Layout>
  )
}

export default CatList
