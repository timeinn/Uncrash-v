import { axios } from '@/utils/request'

const api = {
  login: '/auth/login',
  logout: '/auth/logout',
  info: '/user/info',
  twofactor: '/twofactor',
  sendSms: '/auth/sms'
}
/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return axios({
    url: api.login,
    method: 'post',
    data: parameter
  })
}

export function logout (parameter) {
  return axios({
    url: api.logout,
    method: 'get',
    data: parameter
  })
}

export function getInfo () {
  return axios({
    url: api.info,
    method: 'get'
  })
}

export function getSmsCaptcha (parameter) {
  return axios({
    url: api.SendSms,
    method: 'post',
    data: parameter
  })
}

export function get2step (parameter) {
  return axios({
    url: api.twofactor,
    method: 'get',
    data: parameter
  })
}
