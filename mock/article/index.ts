
import { config } from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'

const { result_code } = config

const timeout = 1000

const list = [
  {
    id: '1',
    nickname: '张三',
    createdAt: '2020-3-23 12:12:12',
    articleTypeId:'1',
    articleTitle:  '阿拉撒旦撒旦',
    abstract: 'asdfdsf爱的色放的',
    previewNumber: 1232,
    likesNum: 1232,
    shareNum: 12321
  },
  {
    id: '2',
    nickname: '张三',
    createdAt: '2020-3-23 12:12:12',
    articleTypeId:'1',
    articleTitle:  '阿拉撒旦撒旦',
    abstract: 'asdfdsf爱的色放的',
    previewNumber: 1232,
    likesNum: 1232,
    shareNum: 12321
  },
  {
    id: '3',
    nickname: '张三',
    createdAt: '2020-3-23 12:12:12',
    articleTypeId:'1',
    articleTitle:  '阿拉撒旦撒旦',
    abstract: 'asdfdsf爱的色放的',
    previewNumber: 1232,
    likesNum: 1232,
    shareNum: 12321
  },
  {
    id: '4',
    nickname: '张三',
    createdAt: '2020-3-23 12:12:12',
    articleTypeId:'1',
    articleTitle:  '阿拉撒旦撒旦',
    abstract: 'asdfdsf爱的色放的',
    previewNumber: 1232,
    likesNum: 1232,
    shareNum: 12321
  },
  {
    id: '5',
    nickname: '张三',
    createdAt: '2020-3-23 12:12:12',
    articleTypeId:'1',
    articleTitle:  '阿拉撒旦撒旦',
    abstract: 'asdfdsf爱的色放的',
    previewNumber: 1232,
    likesNum: 1232,
    shareNum: 12321
  },
  {
    id: '6',
    nickname: '张三',
    createdAt: '2020-3-23 12:12:12',
    articleTypeId:'1',
    articleTitle:  '阿拉撒旦撒旦',
    abstract: 'asdfdsf爱的色放的',
    previewNumber: 1232,
    likesNum: 1232,
    shareNum: 12321
  },
  {
    id: '7',
    nickname: '张三',
    createdAt: '2020-3-23 12:12:12',
    articleTypeId:'1',
    articleTitle:  '阿拉撒旦撒旦',
    abstract: 'asdfdsf爱的色放的',
    previewNumber: 1232,
    likesNum: 1232,
    shareNum: 12321
  }
]
export default [
  // 字典接口
  {
    url: '/article/articlelist',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: result_code,
        data: list
      }
    }
  }
  // 获取某个字典
] as MockMethod[]
