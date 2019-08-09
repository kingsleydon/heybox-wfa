import React, {FC, ReactNode} from 'react'
import {Box, Heading, BoxProps} from 'grommet'

interface CardProps {
  title?: ReactNode
  extra?: ReactNode
  footer?: ReactNode
}

const pad: BoxProps['pad'] = 'medium'

const Card: FC<CardProps> = props => {
  const {title, extra, footer, children, ...restProps} = props
  return (
    <Box
      fill="horizontal"
      {...restProps}
      background={{color: '#ffffff'}}
      round="small"
      elevation="xsmall"
    >
      {(title || extra) && (
        <Box flex align="center" direction="row" pad={pad}>
          <Box flex="grow">
            {title && (
              <Heading level="3" margin="none">
                {title}
              </Heading>
            )}
          </Box>
          {extra && <Box>{extra}</Box>}
        </Box>
      )}
      {children && <Box pad={pad}>{children}</Box>}
      {footer && <Box pad={pad}>{footer}</Box>}
    </Box>
  )
}

export default Card
