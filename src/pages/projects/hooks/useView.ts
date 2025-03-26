'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import { Projects } from '..'
import { ProjectsType } from '../types'

function useView() {
  const router = useRouter()
  const [expanded, setExpanded] = React.useState(false)
  const [items, setItems] = React.useState<ProjectsType.ItemDetail | undefined>(undefined)

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/projects', title: 'Проекты' },
    { href: '#', title: items?.title },
  ]

  const ProjectsIDGET = React.useCallback(async (id: number) => {
    try {
      const response = await Projects.API.View.getProjectsById(id)

      setItems(response.data)
    } catch (error) {
      console.log('products by id projects', error)
    }
  }, [])

  const deleteProject = (async (id: number) => {
    try {
      await Projects.API.View.deleteProject(id)

      router.push('/projects')
    } catch (error) {
      console.log('projects delete request error', error)
    }
  })

  const toggleDescription = React.useCallback(() => {
    setExpanded((prev) => !prev)
  }, [])

  const getFormattedDescription = React.useCallback(() => {
    if (!items?.description) return ''

    const { description } = items

    if (description.length > 185) {
      return expanded ? description : `${description.slice(0, 185)}...`
    }

    return description
  }, [items, expanded])

  return {
    breadcrumbData,
    items,
    expanded,
    actions: {
      router,
      ProjectsIDGET,
      deleteProject,
      getFormattedDescription,
      toggleDescription,
    },
  }
}

export const use = useView
