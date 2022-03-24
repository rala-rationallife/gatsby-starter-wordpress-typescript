import * as React from "react"
import styled from "styled-components"

type Props = {
  content: any
}

const StyledContent = styled.div`
  display: grid;
  row-gap: 30px;
  padding-inline: 10px;

  @media (min-width: 768px) {
    padding-inline: 30px;
  }

  & h2 {
    background-color: var(--background);
    margin: 0;
    font-size: var(--f3);
    padding: 15px;
    border-left: solid 14px var(--blue);

    @media (min-width: 768px) {
      font-size: var(--f2);
    }
  }

  & h3 {
    margin: 0;
    font-weight: normal;
    padding: 5px 15px;
    border-left: solid 10px var(--blue);
  }

  & p {
    margin: 0;

    & a {
      color: var(--blue);
    }
  }

  & ul {
    display: grid;
    row-gap: 10px;
    margin: 0;
    padding-block: 30px;
    padding-inline: 45px 30px;
    font-size: var(--f5);
    border: dashed 1px var(--blue);
    background-color: var(--blueBack);

    @media (min-width: 768px) {
      font-size: var(--f4);
    }
  }
`

export const Content: React.VFC<Props> = ({ content }) => {
  return <StyledContent dangerouslySetInnerHTML={{ __html: content }} />
}
