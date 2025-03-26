import { axiosRequest } from '@/shared/api/axios'

export const getHistories = (url?: string, modelType?: string, action?: string, user?: string) => {
  return axiosRequest.get(url || '/history/', {
    params: {
      modelType,
      action,
      user,
    },
  })
}

export const getUsers = () => {
  return axiosRequest.get('/users/')
}
