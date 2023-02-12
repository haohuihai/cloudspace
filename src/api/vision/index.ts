import request from '@/config/axios'

export const getChinaMap = (params): any => {
  return request.get({ url: '/api/vision/getmap', params })
}

export const getProvince = (params): any => {
  return request.get({ url: '/api/vision/province', params })
}
export const getMapType = (params): any => {
  return request.get({ url: '/api/vision/mapDataType', params })
}
export const getTrendData = (params): any => {
  return request.get({ url: '/api/vision/getTrendData', params })
}
export const getHotData = (params): any => {
  return request.get({ url: '/api/vision/getHotData', params })
}
export const getRankData = (params): any => {
  return request.get({ url: '/api/vision/getRankData', params })
}
export const getSellerData = (params): any => {
  return request.get({ url: '/api/vision/getSellerData', params })
}
export const getStockData = (params): any => {
  return request.get({ url: '/api/vision/getStockData', params })
}
