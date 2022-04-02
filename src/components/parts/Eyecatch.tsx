import * as React from "react"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import { DefaultImage } from "./DefaultImage"

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

export const Eyecatch: React.VFC<Props> = ({ featuredImage, alt }) => {
  return (
    <>
      {featuredImage ? (
        <GatsbyImage
          image={featuredImage.node.localFile.childImageSharp.gatsbyImageData}
          alt={alt}
          as={`figure`}
          style={{ aspectRatio: "16/9" }}
        />
      ) : (
        <DefaultImage />
      )}
    </>
  )
}
