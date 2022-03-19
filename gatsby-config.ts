import type { GatsbyConfig } from "gatsby"
import path from "path"

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Site Name`,
    description: `ここに説明が入ります`,
    siteUrl: `https://example.com/`,
    lang: `ja`,
    locale: `ja_JP`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.resolve(`src/images`),
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `RalaCode`,
        short_name: `RalaCode`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#6297b1`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-styled-components`,
  ],
}

export default config
