import { config } from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'
import { Random } from 'mockjs'
const { result_code } = config

const timeout = 1000

const List: {
  username: string
  password: string
  phone: string
  role: string
  roleId: string
  permissions: string | string[]
}[] = [
  {
    username: 'admin',
    password: 'admin',
    role: 'admin',
    phone: '13132321234',
    roleId: '1',
    permissions: ['*.*.*']
  },
  {
    username: 'test',
    password: 'test',
    role: 'test',
    phone: '13132321234',
    roleId: '2',
    permissions: ['example:dialog:create', 'example:dialog:delete']
  }
]

const applist: {
  name: string
  id: string
  img: string
  path: string
  desc: string
}[] = [
  {
    name: '文章领域',
    id: '1',
    img: '/src/assets/home/tupian.png',
    path: '/article',
    desc: '一款强大的视频播放器'
  },
  {
    name: '玩玩游戏',
    id: '12',
    img: '/src/assets/home/jiaowuxitong.png',
    path: '/game/index',
    desc: '一款强大的视频播放器'
  },
  {
    name: '大屏可视化',
    id: '123',
    img: '/src/assets/home/tieba.png',
    path: '/visualization/home',
    desc: '一款强大的视频播放器'
  },
  {
    name: '后台页面',
    id: '1234',
    img: '/src/assets/home/google_plus5.png',
    path: '/backmanage/analysis',
    desc: '一款强大的视频播放器'
  },
  {
    name: '云盘',
    id: '12341',
    img: '/src/assets/home/google_plus5.png',
    path: '/clouddisk',
    desc: '一款强大的视频播放器'
  },
  {
    name: '会议',
    id: '1234',
    img: '/src/assets/home/google_plus5.png',
    path: '/webrtc',
    desc: '一款强大的视频播放器'
  }
]
export default [
  // 列表接口
  {
    url: '/user/list',
    method: 'get',
    response: ({ query }) => {
      const { username, pageIndex, pageSize } = query

      const mockList = List.filter((item) => {
        if (username && item.username.indexOf(username) < 0) return false
        return true
      })
      const pageList = mockList.filter(
        (_, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1)
      )

      return {
        code: result_code,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  },
  {
    url: '/user/phoneLogin',
    method: 'post',
    timeout,
    response: ({ body }) => {
      const data = body
      let hasUser = false
      for (const user of List) {
        if (user.phone === data.loginInput) {
          hasUser = true
          return {
            code: result_code,
            data: user
          }
        }
      }
      if (!hasUser) {
        return {
          code: '500',
          message: '手机号不存在'
        }
      }
    }
  },
  // 登录接口   账号登陆
  {
    url: '/user/login',
    method: 'post',
    timeout,
    response: ({ body }) => {
      const data = body
      let hasUser = false
      for (const user of List) {
        if (user.username === data.username && user.password === data.password) {
          hasUser = true
          return {
            code: result_code,
            data: user
          }
        }
      }
      if (!hasUser) {
        return {
          code: '500',
          message: '账号或密码错误'
        }
      }
    }
  },
  // 退出接口
  {
    url: '/user/loginOut',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: result_code,
        data: null
      }
    }
  },
  {
    url: '/user/getPhoneCode',
    method: 'post',
    timeout,
    response: ({ body }) => {
      return {
        code: result_code,
        data: body.phoneCode
      }
    }
  },
  {
    url: '/user/appList',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const data = query.name ? applist.filter((item) => item.name.includes(query.name)) : applist
      return {
        code: result_code,
        data: data
      }
    }
  },
  {
    url: '/login/getQRImage',
    method: 'get',
    response: ({ query }) => {
      const image = Random.image('200x100', '#ffcc33', '#FFF', 'png', query.code)

      return {
        code: result_code,
        data: image
      }
    }
  }
] as MockMethod[]
