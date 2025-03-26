'use client'

import React, { useState } from 'react'

import { Form, notification, Upload } from 'antd'
import { UploadProps } from 'antd/lib'
import { useRouter, useSearchParams } from 'next/navigation'

import { Projects } from '..'
import { ProjectsType } from '../types'

function useEdit() {
  const [form] = Form.useForm()
  const router = useRouter()
  const searchParams = useSearchParams()
  const projectTitle = String(searchParams?.get('title') || 'Название проекта')
  const [submitted, setSubmitted] = React.useState(false)
  const [items, setItems] = React.useState<ProjectsType.ItemDetail | undefined>(undefined)
  const [isProjectsLoading, setIsProjectsLoading] = React.useState(true)
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [api, contextHolder] = notification.useNotification()

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/projects', title: 'Проекты' },
    { href: '/', title: projectTitle },
    { href: '#', title: 'Изменить' },
  ]

  const ProjectsIDGET = React.useCallback(async (id: number) => {
    try {
      const response = await Projects.API.Edit.getProjectsById(id)

      setItems(response.data)
    } catch (error) {
      console.log('products by id projects', error)
    } finally {
      setIsProjectsLoading(false)
    }
  }, [])

  const EditProject = React.useCallback(async (id: string, data: ProjectsType.FormEdit) => {
    setSubmitted(true)

    try {
      const dataToSend = {
        ...data,
        image: !Array.isArray(data.image) ? null : data.image,
      }

      const formData: any = new FormData()

      Object.entries(dataToSend).forEach(([key, value]) => {
        if (key !== 'image' && value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })

      if (dataToSend.image === null) {
        formData.append('image', '')
      } else if (Array.isArray(dataToSend.image) && dataToSend.image[0]) {
        const file = dataToSend.image[0].originFileObj

        if (file) {
          formData.append('image', file)
        }
      }

      const response = await Projects.API.Edit.editProject(id, formData)

      if (response.status === 200) {
        api.success({
          message: 'Проект успешно был изменён',
          placement: 'top',
        })
        router.push(`/projects/${id}`)
      } else {
        api.error({
          message: 'Что-то пошло не так',
          placement: 'top',
        })
      }
    } catch (error) {
      console.log('error edit employee', error)
    } finally {
      setSubmitted(false)
    }
  }, [])

  const handleClickColor = React.useCallback((color: string) => {
    setSelectedColor(color)
    form.setFieldsValue({ color })
  }, [form])

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

  const initialImageFileList = items?.image
    ? [
      {
        uid: '-1',
        name: items.image.split('/').pop() || 'image.jpg',
        status: 'done',
        url: items.image,
      },
    ]
    : []

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
    breadcrumbData,
    items,
    isProjectsLoading,
    form,
    contextHolder,
    submitted,
    projectTitle,
    defaultDraggerProps,
    initialImageFileList,
    selectedColor,
    color_options,
    actions: {
      router,
      setSelectedColor,
      ProjectsIDGET,
      EditProject,
      handleClickColor,
    },
  }
}

export const use = useEdit
