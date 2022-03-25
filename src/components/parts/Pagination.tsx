import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"
import * as React from "react"
import styled from "styled-components"

type PaginationType = {
  first: number
  last: number
  current: number
  preSlug: string
}

const StyledPagination = styled.nav`
  & .navLinks {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    font-size: var(--f5);
  }

  & a {
    display: grid;
    grid-auto-flow: column;
    column-gap: 10px;
    align-items: center;
    padding: 15px 30px;
    border: solid 1px currentColor;
  }

  & .prev {
    justify-self: start;
  }

  & .next {
    justify-self: end;
  }
`

export const Pagination: React.VFC<PaginationType> = ({
  first,
  last,
  current,
  preSlug,
}) => {
  return (
    <StyledPagination role="navigation" aria-label="投稿">
      <h2 className="screen-reader-text">投稿ナビゲーション</h2>
      <div className="navLinks">
        {!first && (
          <Link
            to={current === 2 ? `/${preSlug}/` : `/${preSlug}/${current - 1}/`}
            rel="prev"
            className="prev"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            <span>前のページ</span>
          </Link>
        )}

        {!last && (
          <Link to={`/${preSlug}/${current + 1}/`} rel="next" className="next">
            <span>次のページ</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        )}
      </div>
    </StyledPagination>
  )
}
