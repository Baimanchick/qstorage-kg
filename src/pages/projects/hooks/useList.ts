'use client'

import React, { useState } from 'react'

import { Form, notification, Upload } from 'antd'
import { UploadProps } from 'antd/lib'
import { useRouter } from 'next/navigation'

import { useDisclosure } from '@/shared/hooks/useDisclosure'

import { Projects } from '..'
import { ProjectsType } from '../types'

function useList() {
  const [form] = Form.useForm()
  const createModal = useDisclosure()
  const router = useRouter()
  const [submitted, setSubmitted] = React.useState(false)
  const [isCreated, setIsCreated] = React.useState(false)
  const [projects, setProjects] = useState<ProjectsType.Item[] | undefined>(undefined)
  const [warehouses, setWarehouses] = useState<ProjectsType.Warehouse[] | undefined>(undefined)
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [api, contextHolder] = notification.useNotification()

  const createProduct = (async (data: ProjectsType.Form) => {
    setSubmitted(true)
    try {
      const dataToSend = {
        ...data,
      }

      const formData = new FormData()

      Object.entries(dataToSend).forEach(([key, value]) => {
        if (key !== 'image' && value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })

      if (Array.isArray(dataToSend.image) && dataToSend.image[0]) {
        const file = dataToSend.image[0].originFileObj

        if (file) {
          formData.append('image', file)
        }
      }

      const response = await Projects.API.List.createProject(formData)

      if (response.status === 201 || response.status === 200) {
        api.success({
          message: 'Проект успешно создан',
          placement: 'top',
        })
      } else {
        api.error({
          message: 'Что-то пошло не так',
          placement: 'top',
        })
      }
      await ProjectsGET()
      router.refresh()

      setIsCreated(true)
    } catch (error) {
      console.log('project create error', error)
    } finally {
      setSubmitted(false)
    }
  })

  const ProjectsGET = React.useCallback(async () => {
    try {
      const response = await Projects.API.List.getProjects()

      setProjects(response.data.results)
    } catch (error) {
      console.error('project error', error)
    }
  }, [])

  const ProjectsWarehousesGET = React.useCallback(async () => {
    try {
      const response = await Projects.API.List.getWarehouses()

      setWarehouses(response.data.results)
    } catch (error) {
      console.error('project warehouses error', error)
    }
  }, [])

  const handleClickColor = (color: string) => {
    setSelectedColor(color)
  }

  const defaultDraggerProps: UploadProps = {
    name: 'image',
    accept: 'image/*',
    maxCount: 1,
    beforeUpload(file) {
      if (!file.type.startsWith('image/')) {
        console.error(`Файл не изображение: "${file.name}"`)

        return Upload.LIST_IGNORE
      }

      return false
    },
  }

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/projects', title: 'Проекты' },
  ]

  const color_options: string[] = [
    '#FA541C',
    '#1890FF',
    '#F5222D',
    '#52C41A',
    '#722ED1',
    '#13C2C2',
    '#EB2F96',
    '#8B4513',
  ]

  return {
    isCreated,
    contextHolder,
    defaultDraggerProps,
    submitted,
    form,
    breadcrumbData,
    projects,
    warehouses,
    selectedColor,
    color_options,
    actions: {
      createModal,
      router,
      handleClickColor,
      ProjectsGET,
      ProjectsWarehousesGET,
      createProduct,
    },
  }
}

export const use = useList
