import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

export const getStock = async (page: number = 1) => {
  return axiosRequest.get(`/products/stock?page=${page}`, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}
