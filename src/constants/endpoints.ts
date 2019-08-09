interface Endpoints {
  [key: string]: string
}

const WFA_ENDPOINTS: Readonly<Endpoints> = {
  cetusStatus: '/cetusStatus',
}

export const ENDPOINTS: Readonly<Endpoints> = {
  token: '/connect/token',
  ...WFA_ENDPOINTS,
}
