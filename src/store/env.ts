import {Reducer} from 'redux'
import qs from 'qs'
import {
  createAxiosActionTypes,
  AxiosRequestAction,
  AxiosResponseAction,
} from 'utils/redux'
import {ENDPOINTS} from 'constants/endpoints'
import {CLIENT_ID, CLIENT_SECRET} from 'constants/token'

const {REQUEST_TOKEN} = createAxiosActionTypes('env', ['REQUEST_TOKEN'])

const initialState = {
  tokenExpired: true,
  platform: 'pc',
}

export const requestToken = (): AxiosRequestAction => ({
  type: REQUEST_TOKEN.REQUEST,
  payload: {
    request: {
      url: ENDPOINTS.token,
      method: 'POST',
      data: qs.stringify({
        /* eslint-disable @typescript-eslint/camelcase */
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'client_credentials',
        /* eslint-enable @typescript-eslint/camelcase */
      }),
      headers: {'content-type': 'application/x-www-form-urlencoded'},
    },
  },
})

const env: Reducer<object, AxiosResponseAction> = (
  state = initialState,
  {type, payload}
) => {
  switch (type) {
    case REQUEST_TOKEN.SUCCESS:
      return {...state, token: payload.data.access_token}
  }
  return state
}

export default env
