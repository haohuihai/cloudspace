import request from '@/config/axios'

// 获取应用列表

export const getAppListApi = async (): Promise<IResponse> => {
  return request.get({ url: '/user/appList' })
}
export const randomImageApi = async (): Promise<IResponse> => {
  return request.get({ url: 'https://v.api.aa1.cn/api/api-meiribizhi/api.php' })
}

// 360图片获取,此时会跨域
// export const randomImageApi = async (params): Promise<IResponse> => {
//   return request.get({
//     url:
//       'http://wallpaper.apc.360.cn/index.php?c=WallPaperAndroid&a=getAppsByCategory&cid=' +
//       params.cid +
//       '&start=' +
//       params.start +
//       '&count=' +
//       params.count
//   })
// }
