
import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

export const getProjects = async () => {
  return axiosRequest.get('/project/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const getWarehouses = async () => {
  return axiosRequest.get('/warehouses/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const createProject = async (body: FormData) => {
  return axiosRequest.post('/project/', body ,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}
