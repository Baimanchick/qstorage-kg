'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import { History } from '..'
import { HistoryTypes } from '../types'

function useList() {
  const router = useRouter()
  const [isHistoriesLoading, setIsHistoriesLoading] = React.useState(true)
  const [history, setHistory] = React.useState<HistoryTypes.ApiResponse | null>(null)
  const [selectedAction, setSelectedAction] = React.useState<string | undefined>('all')
  const [selectedModel, setSelectedModel] = React.useState<string | undefined>('all')
  const [users, setUsers] = React.useState<HistoryTypes.User[] | null>(null)
  const [selectedUser, setSelectedUser] = React.useState<string | undefined>(undefined)

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { title: 'История' },
  ]

  const getHistories = React.useCallback(async (url?: string, modelType?: string, action?: string, user?: string) => {
    setIsHistoriesLoading(true)

    try {
      const response = await History.API.List.getHistories(url, modelType, action, user)

      if (response.status === 200) {
        setHistory(response.data)
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsHistoriesLoading(false)
    }
  }, [])

  const getUsers = React.useCallback(async () => {
    try {
      const response = await History.API.List.getUsers()

      if (response.status === 200) {
        setUsers(response.data.results)
      }
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  const checkStatus = React.useCallback((status: string): string => {
    const statusMap: Record<string, string> = {
      created: 'СОЗДАНИЕ',
      updated: 'ИЗМЕНЕНИЕ',
      deleted: 'УДАЛЕНИЕ',
      verified: 'ПОДТВЕРЖДЕНИЕ',
    }

    return statusMap[status] || 'НЕИЗВЕСТНЫЙ СТАТУС'
  }, [])

  const getTagColor = React.useCallback((status: string): string => {
    const colorMap: Record<string, string> = {
      updated: 'gold',
      verified: 'green',
      created: 'geekblue',
      deleted: 'red',
      not_verified: 'gray',
    }

    return colorMap[status] || 'default'
  }, [])

  const getModelName = React.useCallback((modelName: string) => {
    const model: Record<string, | string> = {
      Incoming: 'ПРИХОД',
      Outgoing: 'УХОД',
      default: 'НЕИЗВЕСТНО',
    }

    return model[modelName] || 'default'
  }, [])

  const handlePageChange = () => {
    const nextPageUrl = history?.next

    if (nextPageUrl) {
      getHistories(nextPageUrl)
    }
  }

  return {
    breadcrumbData,
    history,
    isHistoriesLoading,
    selectedAction,
    selectedModel,
    users,
    selectedUser,
    actions: {
      router,
      getHistories,
      getTagColor,
      checkStatus,
      getModelName,
      handlePageChange,
      setSelectedAction,
      setSelectedModel,
      getUsers,
      setSelectedUser,
    },
  }
}

export const use = useList
