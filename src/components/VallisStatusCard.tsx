import React, {FC, useEffect, EffectCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Accordion, AccordionPanel, Box, Text, Button} from 'grommet'
import {Refresh} from 'grommet-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSnowflake} from '@fortawesome/free-regular-svg-icons'
import {faFire} from '@fortawesome/free-solid-svg-icons'
import {State} from 'store'
import {
  loadVallisStatus,
  VallisStatus,
  Rewards,
  loadSolaris,
} from 'store/status'
import Card, {CardProps} from 'components/Card'
import RewardList from 'components/RewardList'
import ExpiryClock from 'components/ExpiryClock'

const VallisStatusCard: FC<CardProps> = props => {
  const vallisStatus = useSelector<State, VallisStatus>(
    state => state.status.vallisStatus
  )
  const solaris = useSelector<State, Rewards>(state => state.status.solaris)
  const dispatch = useDispatch()

  const fetchData: EffectCallback = () => {
    dispatch(loadVallisStatus())
    dispatch(loadSolaris())
  }

  useEffect(fetchData, [dispatch])

  return (
    <Card
      title="福尔图娜讯息"
      loading={vallisStatus.loading || solaris.loading}
      {...(vallisStatus.data && {
        extra: (
          <Box flex align="center" direction="row">
            <FontAwesomeIcon
              icon={vallisStatus.data.isWarm ? faFire : faSnowflake}
              color={vallisStatus.data.isWarm ? '#F1A302' : '#4788C7'}
              pull="left"
            />
            <Text size="small">
              {vallisStatus.data.isWarm ? '温暖' : '寒冷'}
            </Text>
          </Box>
        ),
        footer: (
          <Box flex direction="row" align="center" justify="between">
            <ExpiryClock expiry={vallisStatus.data.expiry} />
            <Button
              icon={<Refresh size="small" />}
              plain={false}
              color="accent-1"
              onClick={fetchData}
            />
          </Box>
        ),
      })}
      {...props}
    >
      <Accordion>
        <AccordionPanel
          label={
            <Text margin={{vertical: 'small'}} size="small">
              赏金任务列表
            </Text>
          }
        >
          <RewardList data={solaris.data ? solaris.data : []} />
        </AccordionPanel>
      </Accordion>
    </Card>
  )
}

export default VallisStatusCard
