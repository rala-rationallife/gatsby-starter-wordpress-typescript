import { Link } from "gatsby"
import * as React from "react"
import styled from "styled-components"

type Props = {
  date: string
  dateJP: string
  modified: string
  modifiedJP: string
  title: string
  slug?: string
  categories?: ReadonlyArray<{
    id: string
    slug: string
    name: string
  }>
}

const StyledArticleHead = styled.div`
  display: grid;
  row-gap: 30px;
  padding-inline: 10px;

  & .date {
    justify-self: center;
    display: grid;
    justify-items: center;
  }

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

  & .cat {
    justify-self: center;
    display: grid;
    grid-auto-flow: column;
    column-gap: 10px;
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  & .catLink {
    justify-self: center;
    display: block;
    padding: 3px 10px;
    border-radius: 20px;
    box-shadow: 0 0 10px var(--blue);
    font-size: var(--f6);
  }
`

export const ArticleHead: React.VFC<Props> = ({
  date,
  dateJP,
  modified,
  modifiedJP,
  title,
  slug,
  categories,
}) => {
  return (
    <StyledArticleHead>
      <div className="date">
        <time dateTime={date}>公開：{dateJP}</time>
        {dateJP !== modifiedJP && (
          <time dateTime={modified}>{`（更新：${modifiedJP}）`}</time>
        )}
      </div>
      {slug ? (
        <h1 className="title">
          <Link to={slug}>{title}</Link>
        </h1>
      ) : (
        <h1 className="title">{title}</h1>
      )}
      {categories && (
        <ul className="cat">
          {categories.map(cat => (
            <li key={cat.id}>
              <Link to={`/${cat.slug}/`} className="catLink">
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </StyledArticleHead>
  )
}
