import request from '@/config/axios'
// 获取文章列表
export const getArticleList = async (data): Promise<IResponse> => {
  return request.get({ url: `/api/article/articlelist?page=${data.page}` })
}
// 保存文章
export const publishArticleApi = async (data): Promise<IResponse> => {
  return request.post({ url: '/api/article/saveEditContent', data })
}

// 上传图片
export const uploadArticleImg = async (data): Promise<IResponse> => {
  return request.post({ url: '/api/upload/articleImage', data })
}

export const getArticleDetail = async (id): Promise<IResponse> => {
  return request.get({ url: `/api/article/getArticDetail/${id}` })
}
