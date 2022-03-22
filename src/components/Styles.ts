import { createGlobalStyle, css } from "styled-components"

const Reset = css`
  body {
    box-sizing: border-box;
    margin: 0;
    font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN",
      "Hiragino Sans", "Meiryo", sans-serif;
    color: var(--text);

    & *,
    & *::before,
    & *::after {
      box-sizing: inherit;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: opacity 0.5s;

    &:hover {
      opacity: 0.7;
    }

    &:focus {
      outline: none;
    }
  }

  figure {
    max-height: 100%;
    margin: 0;
    padding: 0;
  }

  img {
    max-width: 100%;
    height: auto;
    vertical-align: bottom;
  }

  iframe {
    width: 100%;
  }

  .sr-only {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  h1 {
    font-size: var(--f1);
  }

  h2 {
    font-size: var(--f2);
  }

  h3 {
    font-size: var(--f3);
  }

  h4 {
    font-size: var(--f4);
  }

  h5 {
    font-size: var(--f5);
  }

  h6 {
    font-size: var(--f6);
  }

  p {
    font-size: var(--f5);
    line-height: 1.8;

    @media (min-width: 768px) {
      font-size: var(--f4);
    }
  }

  ul {
    line-height: 1.8;
  }
`

const Variables = css`
  :root {
    --f1: 2.44em;
    --f2: 1.95em;
    --f3: 1.56em;
    --f4: 1.25em;
    --f5: 1em;
    --f6: 0.8em;
    --text: #555555;
    --white: #ffffff;
    --background: #f7f7f7;
    --blue: #4773ba;
    --blueBack: #f8f9ff;
    --maxWidth: 780px;
    --headerHeight: 80px;
    --side: 10px;

    @media (min-width: 1024px) {
      --side: 7vw;
    }
  }
`

const ForWordPress = css`
  .alignleft {
    float: left;
    margin-inline: 0 1em;
  }

  .alignright {
    float: right;
    margin-inline: 1em 0;
  }

  .aligncenter {
    margin-inline: auto;

    &.wp-block {
      &-categories,
      &-latest-posts,
      &-archives,
      &-tag-cloud,
      &-latest-comments,
      &-rss {
        text-align: center;
      }
    }
  }

  .alignfull {
    margin-inline: calc(var(--side) * -1);

    @media (min-width: 768px) {
      margin-inline: 0;
    }
  }

  .wp-block {
    &:not([data-align="full"]):not([data-align="wide"]) {
      max-width: var(--maxWidth);
    }

    &[data-align="wide"] {
      max-width: calc(var(--maxWidth) + 300px);
    }
  }

  /* https://make.wordpress.org/accessibility/handbook/markup/the-css-class-screen-reader-text/ */
  .screen-reader-text {
    border: 0;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    word-wrap: normal !important;
  }

  .wpcf7 {
    &-text,
    &-textarea {
      width: 100%;
      padding: 10px;
      border: solid 1px #bbb;
      font-size: var(--f5);
      outline: none;
    }

    &-submit {
      width: 250px;
      padding: 10px;
      border: none;
      background-color: var(--baseColor);
      color: #fff;
      font-size: var(--f5);
      transition: opacity 0.5s;
      -webkit-appearance: none;

      &:hover {
        cursor: pointer;
        opacity: 0.7;
      }
    }
  }
`

const WpBlock = css`
  p.has-background {
    padding: 30px;
    border: solid 1px #ddd;
  }

  .wp-block {
    &-media-text {
      &__media {
        background-size: cover;
        min-height: 250px;

        & img {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }
      }

      &__content {
        padding: 0 8% 16px;
        word-break: break-word;

        & .has-large-font-size {
          font-size: 2.25em;
        }
      }

      @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 50% 1fr;
        align-items: center;

        &.has-media-on-the-right {
          grid-template-columns: 1fr 50%;

          & .wp-block-media-text__media {
            order: 2;
          }
        }
      }
    }

    &-image {
      &.gray-border {
        border: solid 1px #ddd;
      }
    }

    &-cover {
      display: grid;
      justify-content: center;
      align-content: center;
      position: relative;
      min-height: 430px;
      background-color: var(--black);
      background-size: cover;
      background-position: 50%;
      margin-bottom: var(--wpBlockMb);

      &.has-parallax {
        background-attachment: fixed;
      }

      &.is-repeated {
        background-repeat: repeat;
        background-size: auto;
      }

      &::before,
      &__gradient-background {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1;
        opacity: 0.5;
        content: "";
        background-color: inherit;
      }

      &__image-background {
        position: absolute !important;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
      }

      &__inner-container {
        position: relative;
        text-align: center;
        color: #fff;
        z-index: 1;
      }
    }

    &-quote {
      display: grid;
      row-gap: 20px;
      background-color: var(--background);
      margin: 0;
      padding: 30px;
      font-style: italic;

      & p {
        margin: 0;
      }
    }

    &-embed-twitter {
      justify-self: center;
    }
  }
`

export const GlobalStyle = createGlobalStyle`
	${Reset}
	${Variables}
	${ForWordPress}
	${WpBlock}

	.myContainer {
		display: grid;
  	grid-template-columns:
    minmax(var(--side), 1fr)
    minmax(auto, 1080px)
    minmax(var(--side), 1fr);

		& > * {
			grid-column: 2;
		}
	}

	.myAlignwide {
		@media (min-width: 1024px) {
			margin-inline: calc(var(--side) / 2 * -1);
		}

		@media (min-width: 1320px) {
			margin-inline: -150px;
		}
	}

	.myGrid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		column-gap: 10px;
		row-gap: 30px;

		& > * {
			grid-column: 1 / -1;
		}

		@media (min-width: 768px) {
			grid-template-columns: repeat(12, 1fr);
			column-gap: 30px;
		}
	}
`
