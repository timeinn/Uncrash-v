import { axios } from '@/utils/request'

const api = {
  user: '/user',
  role: '/role',
  server: '/server',
  logs: '/server/logs'
}

export function getServerList (parameter) {
  return axios({
    url: api.server,
    method: 'get',
    params: parameter
  })
}

export function getServerLogs (parameter) {
  return axios({
    url: api.logs,
    method: 'get',
    params: parameter
  })
}
