import React, {FC, useState, useEffect} from 'react'
import {Text, Box} from 'grommet'
import distanceInWordsStrict from 'date-fns/distance_in_words_strict'
import isFuture from 'date-fns/is_future'
import zhLocale from 'date-fns/locale/zh_cn'

interface ExpiryClockProps {
  expiry: string
}

const DISTANCE_CONFIG = {
  locale: zhLocale,
}

const ExpiryClock: FC<ExpiryClockProps> = props => {
  const {expiry} = props
  const [distance, setDistance] = useState(
    distanceInWordsStrict(expiry, new Date(), DISTANCE_CONFIG)
  )
  const [future, setFuture] = useState(isFuture(expiry))

  useEffect(() => {
    const interval = setInterval(() => {
      setDistance(distanceInWordsStrict(expiry, new Date(), DISTANCE_CONFIG))
      setFuture(isFuture(expiry))
    })

    return () => {
      clearInterval(interval)
    }
  }, [expiry])

  return (
    <Box flex align="center" direction="row">
      <Text size="small" weight="bold">
        {distance}
        {future ? '后' : '前'}
      </Text>
      <Text size="small" margin={{left: '6px'}}>
        切换
      </Text>
    </Box>
  )
}

export default ExpiryClock
