import React, {FC, ReactNode, useState, useEffect} from 'react'
import {Box, Heading, BoxProps, Stack} from 'grommet'
import {Update} from 'grommet-icons'
import {ANIMATION_DURATION} from 'constants/theme'

export interface CardProps extends BoxProps {
  title?: ReactNode
  extra?: ReactNode
  footer?: ReactNode
  loading?: boolean
}

const Card: FC<CardProps> = props => {
  const {title, extra, footer, loading, children, ...restProps} = props
  const [showSpinning, setShowSpinning] = useState(loading)

  useEffect(() => {
    if (loading && !showSpinning) {
      setShowSpinning(true)
      return
    }

    if (!loading && showSpinning) {
      const hideSpinningTimeout = setTimeout(
        () => setShowSpinning(false),
        ANIMATION_DURATION
      )
      return () => {
        clearTimeout(hideSpinningTimeout)
      }
    }
  }, [loading, showSpinning])

  return (
    <Stack>
      <Box
        fill="horizontal"
        border={{color: 'brand', size: 'medium', side: 'bottom'}}
        pad={{vertical: 'medium'}}
        {...restProps}
      >
        {(title || extra) && (
          <Box flex align="center" direction="row">
            <Box flex="grow">
              {title && (
                <Heading level="2" margin={{vertical: 'small'}}>
                  {title}
                </Heading>
              )}
            </Box>
            {extra && <Box>{extra}</Box>}
          </Box>
        )}
        {children && <Box pad="medium">{children}</Box>}
        {footer}
      </Box>
      {showSpinning && (
        <Box
          fill
          flex
          align="center"
          justify="center"
          background={{color: '#ffffff', opacity: 'strong'}}
          animation={loading ? 'fadeIn' : 'fadeOut'}
        >
          <Update className="Spinning" />
        </Box>
      )}
    </Stack>
  )
}

export default Card
