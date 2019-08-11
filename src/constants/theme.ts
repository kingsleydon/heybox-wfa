import {GrommetProps} from 'grommet'

export const ANIMATION_DURATION = 350

export const THEME: Readonly<GrommetProps['theme']> = {
  global: {
    // colors: {
    //   brand: '#228BE6',
    // },
    animation: {
      duration: `${ANIMATION_DURATION}ms`,
    },
    font: {
      family: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';`,
      size: '18px',
      height: '20px',
    },
  },
}
