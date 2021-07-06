import { forwardRef } from 'react'
import styled from 'styled-components'
import { Icon, Typography } from '@equinor/eds-core-react'
import { add_circle_outlined, remove_outlined, add_circle_filled, remove } from '@equinor/eds-icons'
import { outlineTemplate, Tokens } from '@utils'

const { outline } = Tokens
import {
  Accordion as RAccordion,
  AccordionItem as RAccordionItem,
  AccordionButton as RAccordionButton,
  AccordionPanel as RAccordionPanel,
  AccordionProps as RAccordionProps,
  AccordionItemProps as RAccordionItemProps,
  AccordionButtonProps as RAccordionButtonProps,
  AccordionPanelProps as RAccordionPanelProps,
  useAccordionItemContext,
} from '@reach/accordion'

export type AccordionProps = RAccordionProps

export type AccordionItemProps = RAccordionItemProps

export type AccordionHeaderProps = {
  headingLevel?: 'h2' | 'h3' | 'h4' | 'h5'
} & RAccordionButtonProps

export type AccordionPanelProps = RAccordionPanelProps

export const Accordion = ({ children, ...rest }: AccordionProps) => {
  return <RAccordion {...rest}>{children}</RAccordion>
}

const StyledItem = styled(RAccordionItem)`
  border-bottom: 1px solid var(--grey-40);
`

export const Item = forwardRef<HTMLDivElement, RAccordionItemProps>(function Item({ children, ...rest }, ref) {
  return (
    <StyledItem ref={ref} {...rest}>
      {children}
    </StyledItem>
  )
})

const StyledRAccordionButton = styled(RAccordionButton)`
  display: flex;
  align-items: center;
  width: 100%;
  background: transparent;
  padding: var(--space-small) 0;
  border: none;
  cursor: pointer;
  &[data-focus-visible-added]:focus {
    ${outlineTemplate(outline)}
  }
`
const StyledTypography = styled(Typography)<{ isExpanded?: boolean }>`
  font-size: var(--typeScale-1);
  line-height: var(--lineHeight-2);
  display: inline-block;
  padding-top: 2px;
  text-align: left;
  .inverted-background & {
    color: var(--inverted-text);
  }
  ${({ isExpanded }) =>
    isExpanded && {
      fontWeight: 700,
    }}
`

const FilledIcon = styled(Icon)``

const OutlineIcon = styled(Icon)``

const StyledIcon = styled.span`
  flex: 0 0 var(--space-xLarge);
  line-height: 16px;
  & ${FilledIcon}, & ${OutlineIcon} {
    fill: var(--energy-red-100);
  }
`
const StyledHeader = styled(Typography)`
  margin: 0;
  & ${FilledIcon} {
    display: none;
  }
  &:hover ${FilledIcon} {
    display: inline-flex;
  }
  &:hover ${OutlineIcon} {
    display: none;
  }
`

export const Header = forwardRef<HTMLButtonElement, AccordionHeaderProps>(function Header(
  { headingLevel, children, ...rest },
  ref,
) {
  const context = useAccordionItemContext()
  const isExpanded = context.isExpanded
  return (
    <StyledHeader forwardedAs={headingLevel}>
      <StyledRAccordionButton ref={ref} {...rest}>
        {/* Let's do it in the easiest way by just swapping the icons and see how that works */}
        {isExpanded ? (
          <StyledIcon>
            <OutlineIcon size={16} data={remove_outlined} />
            <FilledIcon size={16} data={remove} />
          </StyledIcon>
        ) : (
          <StyledIcon>
            <OutlineIcon size={16} data={add_circle_outlined} />
            <FilledIcon size={16} data={add_circle_filled} />
          </StyledIcon>
        )}
        <StyledTypography isExpanded={isExpanded} forwardedAs="span">
          {children}
        </StyledTypography>
      </StyledRAccordionButton>
    </StyledHeader>
  )
})

const StyledPanel = styled(RAccordionPanel)`
  margin: var(--space-small) var(--space-small) var(--space-large) calc(var(--space-xLarge) / 2);
  border-left: 1px dashed var(--energy-red-100);
  padding-left: calc(var(--space-xLarge) / 2);
  p:last-child {
    margin-bottom: 0;
  }
`

export const Panel = forwardRef<HTMLDivElement, RAccordionPanelProps>(function Panel({ children, ...rest }, ref) {
  return (
    <StyledPanel ref={ref} {...rest}>
      {children}
    </StyledPanel>
  )
})