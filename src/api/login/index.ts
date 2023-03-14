import request from '@/config/axios'
import type { UserType } from './types'
interface RoleParams {
  roleName: string
}
export const loginApi = (data: UserType): Promise<IResponse<UserType>> => {
  return request.post({ url: '/user/login', data })
}
export const getPhoneCode = (data: UserType): Promise<IResponse<UserType>> => {
  return request.post({ url: '/user/getPhoneCode', data })
}
export const phoneLoginApi = (data: UserType): Promise<IResponse<UserType>> => {
  return request.post({ url: '/user/phoneLogin', data })
}
export const getImageCodeApi = (data: UserType): Promise<IResponse<UserType>> => {
  return request.get({ url: '/ImageCode' })
}
export const getAdminRoleApi = (
  params: RoleParams
): Promise<IResponse<AppCustomRouteRecordRaw[]>> => {
  return request.get({ url: '/mock/role/list', params })
}
