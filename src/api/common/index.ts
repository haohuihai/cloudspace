import request from '@/config/axios'

// 获取所有字典
export const getDictApi = (): Promise<IResponse> => {
  return request.get({ url: '/dict/list' })
}

// 模拟获取某个字典
export const getDictOneApi = async (): Promise<IResponse> => {
  return request.get({ url: '/dict/one' })
}

// 获取应用列表
export const getAppListApi = async (): Promise<IResponse> => {
  return request.get({ url: '/user/appList' })
}
