import {useState, useEffect, useRef, EffectCallback} from 'react'
import axios, {AxiosRequestConfig} from 'axios'

const instance = axios.create({
  baseURL: 'https://api.richasy.cn',
})
instance.interceptors.response.use(
  res => {
    return Promise.resolve(res)
  },
  err => {
    if (!axios.isCancel(err)) {
      return Promise.reject(err)
    }
  }
)

type UseAxios = [
  {data: object | null; loading: boolean; error: boolean; fulfilled: boolean},
  RefetchFunc
]

interface RefetchFunc {
  (nextUrl?: string, nextConfig?: AxiosRequestConfig): void
}

const useAxios = (
  initialUrl: string,
  initialConfig?: AxiosRequestConfig
): UseAxios => {
  const [data, setData] = useState(null)
  const [url, setUrl] = useState(initialUrl)
  const [config, setConfig] = useState(initialConfig)
  const [loading, setLoading] = useState(true)
  const [fulfilled, setFulfilled] = useState(false)
  const [error, setError] = useState(false)

  const fetch: EffectCallback = () => {
    if (!url) {
      return
    }

    const source = axios.CancelToken.source()
    const fetchData = async (): Promise<void> => {
      setError(false)
      setFulfilled(false)
      setLoading(true)

      try {
        const result = await instance(url, {
          ...config,
          cancelToken: source.token,
        })
        setData(result.data)
        setFulfilled(true)
      } catch (err) {
        setData(null)
        setError(true)
      }

      setLoading(false)
    }

    fetchData()

    return () => {
      if (source) {
        source.cancel()
      }
    }
  }

  useEffect(fetch, [url, config])

  const refetch = useRef<RefetchFunc>((nextUrl, nextConfig) => {
    if (!nextUrl && !nextConfig) {
      fetch()
    }
    if (nextUrl) {
      setUrl(nextUrl)
    }
    if (nextConfig) {
      setConfig(nextConfig)
    }
  })

  return [{data, loading, error, fulfilled}, refetch.current]
}

export {instance as axios, useAxios}
