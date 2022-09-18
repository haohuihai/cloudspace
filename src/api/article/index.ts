import request from '@/config/axios'
// 获取文章列表
export const getArticleList = async (data): Promise<IResponse> => {
  return request.get({ url: `/v1/article/articlelist?page=${data.page}`})
}
// 获取文章列表
export const publishArticleApi = async (data): Promise<IResponse> => {
  return request.post({ url: '/v1/article/saveEditContent', data })
}