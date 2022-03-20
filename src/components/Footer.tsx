import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

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

const StyledFooter = styled.footer`
  padding-block: 60px;
  background-color: #222222;
  color: var(--white);
  text-align: center;
`

export const Footer: React.VFC = () => {
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

  const thisYear: number = new Date().getFullYear()

  return (
    <StyledFooter>
      &copy; {thisYear} {title}
    </StyledFooter>
  )
}
