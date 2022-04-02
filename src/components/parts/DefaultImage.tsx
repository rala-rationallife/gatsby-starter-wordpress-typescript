import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

export const DefaultImage: React.VFC = () => {
  return (
    <StaticImage
      src={`../../images/default_image.jpg`}
      alt=""
      layout={`fullWidth`}
      as={`figure`}
      style={{ aspectRatio: "16/9" }}
    />
  )
}
