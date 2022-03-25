import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"
import styled from "styled-components"
import { Layout } from "../components/Layout"
import { Main } from "../components/parts/Main"
import { Seo } from "../components/Seo"
import { Sidebar } from "../components/Sidebar"

const StyledArticle = styled.article`
  display: grid;
  align-self: start;
  row-gap: 30px;
  background-color: var(--white);
  padding-block: 30px;

  @media (min-width: 768px) {
    grid-column: 1 / span 8 !important;
  }

  & .postHead {
    display: grid;
    row-gap: 30px;
    padding-inline: 10px;

    & .title {
      justify-self: center;
      font-size: var(--f3);
      margin: 0;
      padding: 0;
      text-align: center;

      @media (min-width: 768px) {
        font-size: var(--f2);
      }
    }
  }

  & .eyecatch {
    aspect-ratio: 16/9;
  }

  & .content {
    display: grid;
    row-gap: 30px;
    padding-inline: 10px;

    @media (min-width: 768px) {
      padding-inline: 30px;
    }

    & p {
      margin: 0;

      & a {
        color: var(--blue);
        text-decoration: underline;
      }
    }
  }
`

const NotFoundPage = () => {
  return (
    <Layout>
      <Seo />
      <Main>
        <div className="myGrid">
          <StyledArticle>
            <div className="postHead">
              <h1 className="title">ページが見つかりません</h1>
            </div>

            <figure className="eyecatch">
              <StaticImage
                src={`../images/page404.png`}
                alt=""
                layout={`fullWidth`}
                style={{ height: "100%" }}
              />
            </figure>

            <div className="content">
              <p>申しわけありません。 お探しのページは見つかりませんでした。</p>

              <p>
                <Link to={`/`}>{`>> ホームに戻る`}</Link>
              </p>
            </div>
          </StyledArticle>
          <Sidebar />
        </div>
      </Main>
    </Layout>
  )
}

export default NotFoundPage
