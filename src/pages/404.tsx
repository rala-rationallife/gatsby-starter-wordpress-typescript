import * as React from "react"
import { Layout } from "../components/Layout"
import { Seo } from "../components/Seo"

const NotFoundPage = () => {
  return (
    <Layout>
      <Seo />
      <div>ページが見つかりません</div>
    </Layout>
  )
}

export default NotFoundPage
