import request from '@/config/axios'

export const getChinaMap = (params): any => {
  return request.get({ url: '/vision/getmap', params })
}

export const getProvince = (params): any => {
  return request.get({ url: '/vision/province', params })
}
export const getMapType = (params): any => {
  return request.get({ url: '/vision/mapDataType', params })
}
export const getTrendData = (params): any => {
  return request.get({ url: '/vision/getTrendData', params })
}
export const getHotData = (params): any => {
  return request.get({ url: '/vision/getHotData', params })
}
export const getRankData = (params): any => {
  return request.get({ url: '/vision/getRankData', params })
}
export const getSellerData = (params): any => {
  return request.get({ url: '/vision/getSellerData', params })
}
export const getStockData = (params): any => {
  return request.get({ url: '/vision/getStockData', params })
}
