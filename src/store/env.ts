/* eslint-disable @typescript-eslint/camelcase */
import {Reducer, Action} from 'redux'
import qs from 'qs'
import Cookies from 'js-cookie'
import {
  createAxiosActionTypes,
  AxiosRequestAction,
  AxiosResponseAction,
  createPlainActionTypes,
  SUFFIX,
} from 'utils/redux'
import {ENDPOINTS} from 'constants/endpoints'
import {CLIENT_ID, CLIENT_SECRET} from 'constants/token'
import {axios} from 'utils/axios'

const {CHECK_TOKEN, REQUEST_TOKEN} = createAxiosActionTypes('env', [
  'CHECK_TOKEN',
  'REQUEST_TOKEN',
])

const {SET_ERROR} = createPlainActionTypes('env', ['SET_ERROR'])

const initialState = {
  tokenExpired: true,
  platform: 'pc',
  token: Cookies.get('token'),
  error: false,
}

interface TokenData {
  access_token: string
  expires_in: number
  token_type: string
}

export const requestToken = (): AxiosRequestAction<TokenData> => ({
  type: REQUEST_TOKEN.REQUEST,
  payload: {
    request: {
      url: ENDPOINTS.token,
      method: 'POST',
      data: qs.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'client_credentials',
      }),
      headers: {'content-type': 'application/x-www-form-urlencoded'},
    },
    options: {
      onSuccess: ({response, dispatch}) => {
        const {
          data: {access_token, expires_in, token_type},
        } = response
        const token = `${token_type} ${access_token}`
        Cookies.set('token', token, {
          expires: Math.floor(expires_in / 86400),
        })
        axios.defaults.headers.common['Authorization'] = token
        dispatch({type: REQUEST_TOKEN.SUCCESS, payload: {data: response.data}})
      },
    },
  },
})

export const checkToken = (): AxiosRequestAction => ({
  type: CHECK_TOKEN.REQUEST,
  payload: {
    request: {
      url: ENDPOINTS.cetusStatus(),
    },
  },
})

export const setError = (): Action => ({
  type: SET_ERROR,
})

const env: Reducer<typeof initialState, AxiosResponseAction> = (
  state = initialState,
  {type, error}
) => {
  if (type === REQUEST_TOKEN.SUCCESS || type === CHECK_TOKEN.SUCCESS) {
    return {
      ...state,
      tokenExpired: false,
    }
  }
  if (
    type === SET_ERROR ||
    (type.endsWith(`_${SUFFIX[SUFFIX.length - 1]}`) && error)
  ) {
    return {
      ...state,
      error: true,
    }
  }

  return state
}

export default env
