import Mock from 'mockjs2'

import './services/auth'
import './services/user'
import './services/server'
import './services/dashboard'

Mock.setup({
  timeout: 800 // 设置延迟响应，模拟向后端请求数据
})

// 获取 mock.Random 对象
// const Random = Mock.Random
