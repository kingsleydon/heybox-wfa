/* eslint-disable @typescript-eslint/camelcase */
import Cookies from 'js-cookie'
import {axios} from 'utils/axios'
import {ENDPOINTS} from 'constants/endpoints'
import {CLIENT_ID, CLIENT_SECRET} from 'constants/token'

interface TokenData {
  access_token: string
  expires_in: number
  token_type: string
}

export const requestToken = async (): Promise<TokenData> => {
  const {
    data,
    data: {access_token, expires_in, token_type},
  } = await axios.post<TokenData>(
    ENDPOINTS.token,
    {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'client_credentials',
    },
    {
      headers: {'content-type': 'application/x-www-form-urlencoded'},
    }
  )

  Cookies.set('token', `${token_type} ${access_token}`, {
    expires: Math.floor(expires_in / 86400),
  })

  return data
}
