import Mock from 'mockjs2'
import { builder } from '../util'

const icons = ['warning', 'info-circle', 'stop', 'check-circle']

const activity = () => {
  const data = []
  for (let i = 0; i < 10; i++) {
    const tmpKey = i + 1
    const num = parseInt(Math.random() * (3 + 1), 10)
    data.push({
      id: tmpKey,
      name: '节点 ' + Mock.mock('@region') + tmpKey,
      time: Mock.mock('@time'),
      status: num,
      icon: icons[num]
    })
  }
  return builder(data)
}

Mock.mock(/\/workplace\/activity/, 'get', activity)
