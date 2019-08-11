import {AxiosRequestConfig, AxiosResponse} from 'axios'
import {Action} from 'redux'

export const SUFFIX: Suffix[] = ['REQUEST', 'SUCCESS', 'FAIL']

type Suffix = 'REQUEST' | 'SUCCESS' | 'FAIL'

export interface DataState<T> {
  loading: boolean
  fulfilled: boolean
  data?: T
}

export interface AxiosRequestAction<T = any> extends Action<string> {
  payload: {
    request: AxiosRequestConfig
    options?: {
      onSuccess({
        getState,
        dispatch,
        response,
      }: {
        getState(): any
        dispatch(action: AxiosResponseAction): void
        response: AxiosResponse<T>
      }): void
    }
  }
  meta?: object
}

export interface AxiosResponseAction<T = any> extends Action<string> {
  payload: AxiosResponse<T> | {data: any}
  meta?: {
    previousAction: AxiosRequestAction
  }
  error?: object
}

export interface AxiosActionTypes {
  [key: string]: {
    [key in Suffix]: string
  }
}

export interface PlainActionTypes {
  [key: string]: string
}

const getType = (module: string, type: string, suffix?: string): string =>
  `${module}/${type}${suffix ? `_${suffix}` : ''}`

export const createAxiosActionTypes = (
  module: string,
  types: string[]
): AxiosActionTypes =>
  types.reduce(
    (typeResult, type) => ({
      ...typeResult,
      [type]: SUFFIX.reduce(
        (suffixResult, suffix) => ({
          ...suffixResult,
          [suffix]: getType(module, type, suffix === SUFFIX[0] ? '' : suffix),
        }),
        {}
      ),
    }),
    {}
  )

export const createPlainActionTypes = (
  module: string,
  types: string[]
): PlainActionTypes =>
  types.reduce(
    (result, type) => ({...result, [type]: getType(module, type)}),
    {}
  )
