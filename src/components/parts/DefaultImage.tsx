import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

export const DefaultImage: React.VFC = () => {
  return (
    <StaticImage
      src={`../../images/ralacode_thumb.png`}
      alt=""
      layout={`fullWidth`}
      style={{ height: "100%" }}
    />
  )
}
