import request from '@/config/axios'

export const getChinaMap = (params): any => {
  return request.get({ url: '/v1/vision/getmap', params})
}

export const getProvince = (params): any => {
    return request.get({url: '/v1/vision/province', params})
}
export const getMapType = (params): any => {
    return request.get({url: '/v1/vision/mapDataType', params})
}
export const getTrendData = (params): any => {
    return request.get({url: '/v1/vision/getTrendData', params})
}
