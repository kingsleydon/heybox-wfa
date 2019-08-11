import React, {FC, useEffect, EffectCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Accordion, AccordionPanel, Box, Text, Button} from 'grommet'
import {Refresh} from 'grommet-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSun, faMoon} from '@fortawesome/free-regular-svg-icons'
import {State} from 'store'
import {loadCetusStatus, CetusStatus, Rewards, loadOstron} from 'store/status'
import Card, {CardProps} from 'components/Card'
import RewardList from 'components/RewardList'
import ExpiryClock from 'components/ExpiryClock'

const CetusStatusCard: FC<CardProps> = props => {
  const cetusStatus = useSelector<State, CetusStatus>(
    state => state.status.cetusStatus
  )
  const ostron = useSelector<State, Rewards>(state => state.status.ostron)
  const dispatch = useDispatch()

  const fetchData: EffectCallback = () => {
    dispatch(loadCetusStatus())
    dispatch(loadOstron())
  }

  useEffect(fetchData, [dispatch])

  return (
    <Card
      title="希图斯讯息"
      loading={cetusStatus.loading || ostron.loading}
      {...(cetusStatus.data && {
        extra: (
          <Box flex align="center" direction="row">
            <FontAwesomeIcon
              icon={cetusStatus.data.isDay ? faSun : faMoon}
              color={cetusStatus.data.isDay ? '#F1A302' : '#4788C7'}
              pull="left"
            />
            <Text size="small">{cetusStatus.data.isDay ? '白天' : '黑夜'}</Text>
          </Box>
        ),
        footer: (
          <Box flex direction="row" align="center" justify="between">
            <ExpiryClock expiry={cetusStatus.data.expiry} />
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
          <RewardList data={ostron.data ? ostron.data : []} />
        </AccordionPanel>
      </Accordion>
    </Card>
  )
}

export default CetusStatusCard
