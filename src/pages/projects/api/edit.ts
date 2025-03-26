import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

import { ProjectsType } from '../types'

export const getProjectsById = async (id: number) => {
  return axiosRequest.get(`/project/${id}/`, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const editProject = async (id: string, data: ProjectsType.FormEdit) => {
  return axiosRequest.patch(`/project/${id}/`, data, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}
