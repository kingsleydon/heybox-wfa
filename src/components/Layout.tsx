import React, {FC} from 'react'
import {Grommet, Box, Heading} from 'grommet'
import {Toast} from 'grommet-icons'
import {THEME} from 'constants/theme'

const AppBar: FC = props => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="center"
    pad="20px"
    {...props}
  />
)

const Layout: FC = ({children}) => {
  return (
    <Grommet theme={THEME} full>
      <Box fill>
        <AppBar>
          <Toast color="brand" />
          <Heading
            level="3"
            margin={{left: '10px', vertical: '0'}}
            size="small"
          >
            WFA Web
          </Heading>
        </AppBar>
        <Box pad="medium" fill className="ContentContainer">
          {children}
        </Box>
      </Box>
    </Grommet>
  )
}

export default Layout
