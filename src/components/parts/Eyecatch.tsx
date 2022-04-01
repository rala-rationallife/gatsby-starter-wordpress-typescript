import * as React from "react"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import { DefaultImage } from "./DefaultImage"
import styled from "styled-components"

type Props = {
  readonly featuredImage?: {
    readonly node: {
      readonly localFile: {
        readonly childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }
    }
  }
  alt: string
}

const StyledEyecatch = styled.figure`
  aspect-ratio: 16/9;
`

export const Eyecatch: React.VFC<Props> = ({ featuredImage, alt }) => {
  return (
    <StyledEyecatch>
      {featuredImage ? (
        <GatsbyImage
          image={featuredImage.node.localFile.childImageSharp.gatsbyImageData}
          alt={alt}
          style={{ height: "100%" }}
        />
      ) : (
        <DefaultImage />
      )}
    </StyledEyecatch>
  )
}
