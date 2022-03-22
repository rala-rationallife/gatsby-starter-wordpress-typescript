import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faHome } from "@fortawesome/free-solid-svg-icons"

type DataType = {
  site: {
    siteMetadata: {
      title: string
    }
  }
  wp: {
    generalSettings: {
      title: string
    }
  }
}

const StyledHeader = styled.header`
  padding-block: 30px;

  & .site {
    justify-self: start;
    font-size: var(--f2);
  }
`

const StyledNav = styled.nav`
  background-color: #222222;
  color: var(--white);
  font-size: var(--f6);

  @media (min-width: 768px) {
    font-size: var(--f5);
  }

  & ul {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(3, auto);
    margin-block: 0;
    padding: 0;
    list-style-type: none;

    @media (min-width: 768px) {
      grid-template-columns: repeat(6, auto);
    }
  }

  & a {
    display: grid;
    grid-auto-flow: column;
    column-gap: 5px;
    justify-content: start;
    align-items: center;
    padding-block: 10px;
    transition: background-color 0.5s;

    &:hover {
      background-color: #686868;
      opacity: 1;
    }

    @media (min-width: 768px) {
      padding-inline-start: 5px;
    }
  }
`

export const Header: React.VFC = () => {
  const data: DataType = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      wp {
        generalSettings {
          title
        }
      }
    }
  `)

  const title =
    data.wp.generalSettings.title ||
    data.site.siteMetadata.title ||
    `Site Title`

  return (
    <>
      <StyledHeader className="myContainer">
        <Link to={`/`} className="site">
          {title}
        </Link>
      </StyledHeader>
      <StyledNav className="myContainer">
        <ul>
          <li>
            <Link to={`/`}>
              <FontAwesomeIcon icon={faHome} />
              トップ
            </Link>
          </li>
          <li>
            <Link to={`/blog/information-exchange/`}>
              <FontAwesomeIcon icon={faEnvelope} />
              お問い合わせ
            </Link>
          </li>
        </ul>
      </StyledNav>
    </>
  )
}
