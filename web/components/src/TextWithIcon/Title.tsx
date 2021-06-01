import { HTMLAttributes } from 'react'
import { Heading } from '../Heading'
import styled from 'styled-components'

type TitleProps = HTMLAttributes<HTMLDivElement>

const StyledTitle = styled(Heading)`
  margin: 0;
  grid-area: title;
  text-align: center;
  margin-bottom: var(--space-xSmall);
`

export const Title = ({ children, ...rest }: TitleProps) => {
  return (
    <StyledTitle size="2xl" regular {...rest}>
      {children}
    </StyledTitle>
  )
}
