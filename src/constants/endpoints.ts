import store from 'store'
import mapValues from 'lodash/mapValues'

const WFA_ENDPOINTS = {
  cetusStatus: () => '/cetusStatus',
  ostron: () => '/ostron',
  vallisStatus: () => '/vallisStatus',
  solaris: () => '/solaris',
}

const PLAIN_ENDPOINTS = {
  token: '/connect/token',
}

const TRANSFORMED_WFA_ENDPOINTS = mapValues(
  WFA_ENDPOINTS,
  (value: (...args: any[]) => string) => (...args: any[]) => {
    const platform = store.getState().env.platform
    return `/wfa/basic/${platform}${value(...args)}`
  }
)

export const ENDPOINTS: Readonly<
  typeof WFA_ENDPOINTS & typeof PLAIN_ENDPOINTS
> = {
  ...PLAIN_ENDPOINTS,
  ...TRANSFORMED_WFA_ENDPOINTS,
}
