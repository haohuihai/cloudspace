import request from '@/config/axios'
import type { UserType } from './types'
interface RoleParams {
  roleName: string
}
export const loginApi = (data: UserType): Promise<IResponse<UserType>> => {
  console.log('data', data)
  return request.post({ url: '/user/login', data })
}
export const getAdminRoleApi = (
  params: RoleParams
): Promise<IResponse<AppCustomRouteRecordRaw[]>> => {
  return request.get({ url: '/role/list', params })
}
