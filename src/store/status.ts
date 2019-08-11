import {
  createAxiosActionTypes,
  AxiosResponseAction,
  AxiosRequestAction,
  DataState,
} from 'utils/redux'
import {Reducer} from 'redux'
import {ENDPOINTS} from 'constants/endpoints'

const {
  LOAD_CETUS_STATUS,
  LOAD_VALLIS_STATUS,
  LOAD_OSTRON,
  LOAD_SOLARIS,
} = createAxiosActionTypes('status', [
  'LOAD_CETUS_STATUS',
  'LOAD_VALLIS_STATUS',
  'LOAD_OSTRON',
  'LOAD_SOLARIS',
])

export const loadCetusStatus = (): AxiosRequestAction => ({
  type: LOAD_CETUS_STATUS.REQUEST,
  payload: {
    request: {
      url: ENDPOINTS.cetusStatus(),
    },
  },
})

export const loadVallisStatus = (): AxiosRequestAction => ({
  type: LOAD_VALLIS_STATUS.REQUEST,
  payload: {
    request: {
      url: ENDPOINTS.vallisStatus(),
    },
  },
})

export const loadOstron = (): AxiosRequestAction => ({
  type: LOAD_OSTRON.REQUEST,
  payload: {
    request: {
      url: ENDPOINTS.ostron(),
    },
  },
})

export const loadSolaris = (): AxiosRequestAction => ({
  type: LOAD_SOLARIS.REQUEST,
  payload: {
    request: {
      url: ENDPOINTS.solaris(),
    },
  },
})

export type CetusStatus = DataState<{
  id: string
  expiry: string
  isDay: boolean
  timeLeft: string
  isCetus: boolean
  shortString: string
}>

export type VallisStatus = DataState<{
  id: string
  expiry: string
  isWarm: boolean
  timeLeft: string
  shortString: string
}>

export type RewardData = ({
  name: string
  minLevel: number
  maxLevel: number
  rewards: ({
    id: number
    type: 'common' | 'uncommon' | 'rare'
    zh: string
    en: string
  })[]
})[]

export type Rewards = DataState<RewardData>

interface StatusInitialState {
  cetusStatus: CetusStatus
  vallisStatus: VallisStatus
  ostron: Rewards
  solaris: Rewards
}

const initialState: StatusInitialState = {
  cetusStatus: {loading: false, fulfilled: false},
  vallisStatus: {loading: false, fulfilled: false},
  ostron: {loading: false, fulfilled: false},
  solaris: {loading: false, fulfilled: false},
}

const status: Reducer<typeof initialState, AxiosResponseAction> = (
  state = initialState,
  {type, payload}
) => {
  if (type === LOAD_CETUS_STATUS.REQUEST) {
    return {
      ...state,
      cetusStatus: {...state.cetusStatus, loading: true, fulfilled: false},
    }
  }
  if (type === LOAD_CETUS_STATUS.SUCCESS) {
    return {
      ...state,
      cetusStatus: {loading: false, fulfilled: true, data: payload.data},
    }
  }
  if (type === LOAD_VALLIS_STATUS.REQUEST) {
    return {
      ...state,
      vallisStatus: {...state.vallisStatus, loading: true, fulfilled: false},
    }
  }
  if (type === LOAD_VALLIS_STATUS.SUCCESS) {
    return {
      ...state,
      vallisStatus: {loading: false, fulfilled: true, data: payload.data},
    }
  }
  if (type === LOAD_OSTRON.REQUEST) {
    return {
      ...state,
      ostron: {...state.ostron, loading: true, fulfilled: false},
    }
  }
  if (type === LOAD_OSTRON.SUCCESS) {
    return {
      ...state,
      ostron: {loading: false, fulfilled: true, data: payload.data},
    }
  }
  if (type === LOAD_SOLARIS.REQUEST) {
    return {
      ...state,
      solaris: {...state.solaris, loading: true, fulfilled: false},
    }
  }
  if (type === LOAD_SOLARIS.SUCCESS) {
    return {
      ...state,
      solaris: {loading: false, fulfilled: true, data: payload.data},
    }
  }
  return state
}

export default status
