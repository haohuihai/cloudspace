import request from '@/config/axios'

// 获取应用列表
export const getAppListApi = async (params): Promise<IResponse> => {
  console.log('query', params)
  return request.get({ url: '/mock/user/appList', params })
}
