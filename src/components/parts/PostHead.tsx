import * as React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

type Props = {
  date: string
  dateJP: string
  modified: string
  modifiedJP: string
  slug: string
  title: string
  categories: string[]
}

const StyledPostHead = styled.div`
  display: grid;
  row-gap: 30px;
  padding-inline: 10px;

  & h1 {
    font-size: var(--f3);
    font-weight: normal;
    margin: 0;
    padding: 0;
    text-align: center;

    @media (min-width: 768px) {
      font-size: var(--f2);
    }
  }

  ul {
    display: grid;
    grid-auto-flow: column;
    column-gap: 10px;
    margin: 0;
    padding: 0;
    list-style-type: none;

    a {
      display: block;
      padding: 3px 10px;
      border-radius: 20px;
      box-shadow: 0 0 10px var(--blue);
      font-size: var(--f6);
    }
  }
`

export const PostHead: React.VFC<Props> = ({
  date,
  dateJP,
  modified,
  modifiedJP,
  slug,
  title,
  categories,
}) => {
  return (
    <StyledPostHead>
      {date && (
        <div>
          <time dateTime={date}>{dateJP}</time>
          {dateJP !== modifiedJP && (
            <time dateTime={modified}>{`（更新日: ${modifiedJP}）`}</time>
          )}
        </div>
      )}
      {slug ? (
        <h1>
          <Link to={slug}>{title}</Link>
        </h1>
      ) : (
        <h1>{title}</h1>
      )}
      {categories && (
        <ul>
          {categories.map(cat => (
            <>
              {/* @ts-ignore */}
              <li key={cat.id}>
                {/* @ts-ignore */}
                <Link to={`/category/${cat.slug}/`}>{cat.name}</Link>
              </li>
            </>
          ))}
        </ul>
      )}
    </StyledPostHead>
  )
}
