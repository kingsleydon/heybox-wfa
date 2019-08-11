import React, {FC, ReactElement, useState} from 'react'
import {BoxProps, Tabs, Tab, Box} from 'grommet'

interface PaginationProps extends BoxProps {
  pages: ReactElement[]
}

const Pagination: FC<PaginationProps> = props => {
  const {pages, ...restProps} = props
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <Box {...restProps}>
      <Box>
        <Tabs activeIndex={activeIndex} onActive={setActiveIndex}>
          {pages.map((page, index) => (
            <Tab title={String(index + 1)} key={index}>
              {page}
            </Tab>
          ))}
        </Tabs>
      </Box>
    </Box>
  )
}

export default Pagination
