import React, {FC} from 'react'
import {Box, Text} from 'grommet'
import {RewardData} from 'store/status'
import Pagination from 'components/Pagination'
import {REWARD_TYPE_MAP} from 'constants/reward'

interface RewardListProps {
  data: RewardData
}

const RewardList: FC<RewardListProps> = ({data}) => {
  const pages = data.map(({rewards}, index) => (
    <Box key={index}>
      {rewards.map(({type, id, zh}, index) => {
        const {color, text} = REWARD_TYPE_MAP[type]
        return (
          <Box
            flex
            direction="row"
            align="center"
            key={id}
            margin={{top: index === 0 ? 'medium' : 'none', bottom: 'medium'}}
          >
            <Box border={{color}} pad="xsmall" round="small">
              <Text size="xsmall" color={color}>
                {text}
              </Text>
            </Box>
            <Box margin={{left: '15px'}}>
              <Text size="small">{zh}</Text>
            </Box>
          </Box>
        )
      })}
    </Box>
  ))

  return <Pagination pages={pages} />
}

export default RewardList
