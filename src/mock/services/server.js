import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const totalCount = 5701
const oneGbyte = 986

const getRam = (gig) => {
  return `${(oneGbyte * gig).toFixed(2)}MB`
}

const server = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    const totalRam = Math.floor(Math.random() * 10 + 1)
    const useRam = (totalRam * 0.2).toFixed(2)

    const totalDisk = Math.floor(Math.random() * 1000 + 1)
    result.push({
      key: tmpKey,
      no: tmpKey,
      cpu: `${Mock.mock('@integer(0, 100)')}%`,
      load: `0.00 ${Mock.Random.float(0, 50, 2, 2)} ${Mock.Random.float(0, 50, 2, 2)}`,
      ram: `${getRam(useRam)} / ${getRam(totalRam)}`,
      disk: `${getRam(totalDisk)}`,
      description: '节点 ' + Mock.mock('@region') + tmpKey,
      callNo: Mock.mock('@integer(1, 999)'),
      status: Mock.mock('@integer(0, 2)'),
      updatedAt: Mock.mock('@datetime'),
      editable: false
    })
  }
  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}

Mock.mock(/\/server/, 'get', server)
