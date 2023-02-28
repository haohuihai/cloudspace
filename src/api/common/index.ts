import request from '@/config/axios'

// 获取应用列表
export const getAppListApi = async (): Promise<IResponse> => {
  return request.get({ url: '/mock/user/appList' })
}
