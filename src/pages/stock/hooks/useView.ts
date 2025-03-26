'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import { Stock } from '..'
import { StockType } from '../types'

function useView() {
  const router = useRouter()
  const [stock, setStock] = React.useState<StockType.ApiResponse | undefined>(undefined)
  const [currentPage, setCurrentPage] = React.useState(1)

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/inventory', title: 'Остатки товара' },
  ]

  const StockGET = React.useCallback(async (page: number = 1) => {
    try {
      const response = await Stock.API.View.getStock(page)

      setStock(response.data)
    } catch (error) {
      console.log('get stock error', error)
    }
  }, [])

  return {
    breadcrumbData,
    stock,
    currentPage,
    actions: {
      router,
      StockGET,
      setCurrentPage,
    },
  }
}

export const use = useView
