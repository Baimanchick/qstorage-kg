'use client'

import React, { ChangeEvent } from 'react'

import { Form, Upload, UploadProps, message } from 'antd'
import { useRouter } from 'next/navigation'

import { useAppSelector } from '@/shared/hooks/redux'
import { useDisclosure } from '@/shared/hooks/useDisclosure'
import useNotification from '@/shared/hooks/useNotifications'
import { debounce } from '@/shared/tools/debounce'

import { ProductsIncoming } from '..'
import { ProductsItemsTypes } from '../../items/types'
import { ProductsIncomingTypes } from '../types'

function useEdit() {
  const [form] = Form.useForm()
  const [products, setProducts] = React.useState<ProductsItemsTypes.ApiResponse | null>(null)
  const [selectedProducts, setSelectedProducts] = React.useState<ProductsIncomingTypes.SelectedItem[]>([])
  const [incoming, setIncoming] = React.useState<ProductsIncomingTypes.Item | null>(null)
  const [userResponsible, setUserResponsible] = React.useState<ProductsIncomingTypes.Responsible[] | null>(null)
  const [isProductsLoading, setIsProductsLoading] = React.useState(true)
  const [isIncomingLoading, setIsIncomingLoading] = React.useState(true)
  const [submitted, setSubmitted] = React.useState(false)
  const [deleteItems, setDeleteItems] = React.useState<string[]>([])
  const [updateItems, setUpdateItems] = React.useState<ProductsIncomingTypes.EditForm['update_items']>([])
  const [newItems, setNewItems] = React.useState<ProductsIncomingTypes.ProductItems[]>([])
  const [deleteFileList, setDeleteFileList] = React.useState<number[]>([])

  const createModal = useDisclosure()
  const router = useRouter()
  const { contextHolder } = useNotification()
  const user = useAppSelector((state) => state.user.userData)

  const ProductsGET = React.useCallback(async (search?: string, url?: string) => {
    setIsProductsLoading(true)

    try {
      const response = await ProductsIncoming.API.Edit.getProductSearchedList(search, url)

      if (response.status === 200) {
        setProducts(response.data)
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsProductsLoading(false)
    }
  }, [])

  const IncomingIdGET = React.useCallback(async (id: number) => {
    setIsIncomingLoading(true)

    try {
      const response = await ProductsIncoming.API.Edit.getIncomingDetail(id)

      if (response.status === 200) {
        setIncoming(response.data)

        const data = response.data.items.map((item: ProductsIncomingTypes.Items) => {
          return {
            ...item,
            product: item.product.slug,
          }
        })

        setSelectedProducts(data)
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsIncomingLoading(false)
    }
  }, [])

  const ProductsIncomingUsersGET = React.useCallback(async () => {
    try {
      const response = await ProductsIncoming.API.Create.getUsers()

      setUserResponsible(response.data.results)
    } catch (error) {
      console.log('products incoming project error', error)
    }
  }, [])

  const handlePageChange = () => {
    const nextPageUrl = products?.next

    if (nextPageUrl) {
      ProductsGET(nextPageUrl)
    }
  }

  const debouncedSearch = debounce((search: string) => {
    ProductsGET(search)
  }, 1500)

  const handleSearchProducts = (e: ChangeEvent<HTMLInputElement>) => {
    setIsProductsLoading(true)
    debouncedSearch(e.target.value)
  }

  const deleteFiles = React.useCallback((file: number) => {
    setDeleteFileList((prev) => [...prev, file])
  }, [])

  const onSelectProducts = (selectedRowKeys: React.Key[], selectedRows: ProductsItemsTypes.Item[]) => {
    setSelectedProducts((prevSelected) => {
      const updatedSelected = [...prevSelected]

      selectedRows.forEach((product) => {
        const existingItem = updatedSelected.find((item) => item.product === product.slug)

        if (existingItem) {
          return
        }

        updatedSelected.push({
          product: product.slug || '',
          product_title: product.title,
          quantity: 1,
          purchase_price: product.price,
          total_price: Number(product.price) * 1,
        })
      })

      return updatedSelected
    })
  }

  const editIncoming = async (formValue: ProductsIncomingTypes.EditForm, id: number) => {
    setSubmitted(true)
    try {
      const responsibleObj = userResponsible?.find((item) => `${item.first_name} ${item.last_name}` === formValue.responsible)

      const dataToSend: ProductsIncomingTypes.EditForm = {
        ...formValue,
        responsible: responsibleObj?.uuid,
        items: newItems,
        update_items: updateItems,
        delete_items: deleteItems.length > 0 ? deleteItems : [],
        delete_files: deleteFileList,
      }

      const response = await ProductsIncoming.API.Edit.editIncoming(dataToSend, id)

      if (response.status === 200) {
        router.push('/products/incoming/')
        if (formValue.files && (Array.isArray(formValue.files) ? formValue.files.length > 0 : true)) {
          FilesAddPOST(formValue.files, response.data.id)
        }
      }

    } catch (error) {
      console.error('Ошибка создания прихода:', error)
    } finally {
      setSubmitted(false)
    }
  }

  const FilesAddPOST = React.useCallback(async (files: any, id: number) => {
    try {
      const formData = new FormData()

      if (Array.isArray(files)) {
        files.forEach((item: {originFileObj: File}) => {
          if (item.originFileObj) {
            formData.append('files', item.originFileObj)
          }
        })
      }

      const response = await ProductsIncoming.API.Edit.addFiles(formData, id)

      if (response.status === 201) {
        message.success('Файлдар ийгиликтүү жүктөлдү')
      }
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  const defaultDraggerProps: UploadProps = {
    name: 'files',
    maxCount: 10,
    multiple: true,
    beforeUpload(file) {
      if (file.size / 1024 / 1024 > 10) {
        console.log(`Файл "${file.name}" больше 10 МБ!`)

        return Upload.LIST_IGNORE
      }

      return false
    },
  }

  const breadcrumbData = React.useMemo(() => {
    return [
      { href: '/', title: 'Главная' },
      { href: '/products/incoming', title: 'Приход товаров' },
      { title: 'Редактировать' },
    ]
  }, [])

  React.useEffect(() => {
    if (!incoming) return

    setNewItems([])
    setUpdateItems([])
    setDeleteItems([])

    const incomingSlugs = new Set(incoming.items.map(item => item.product.slug))

    const newAdded: ProductsIncomingTypes.ProductItems[] = []
    const updated: ProductsIncomingTypes.EditForm['update_items'] = []
    const deleted: string[] = []

    selectedProducts.forEach(product => {
      if (!incomingSlugs.has(product.product)) {
        newAdded.push({ product: product.product, purchase_price: product.purchase_price, quantity: product.quantity })
      } else {
        const original = incoming.items.find(item => item.product.slug === product.product)

        if (
          original &&
          (original.quantity !== product.quantity || original.purchase_price !== product.purchase_price)
        ) {
          updated.push({
            product: product.product,
            quantity: product.quantity,
            purchase_price: Number(product.purchase_price),
          })
        }
      }
    })

    incoming.items.forEach(item => {
      if (!selectedProducts.some(product => product.product === item.product.slug)) {
        deleted.push(item.product.slug ? item.product.slug : '')
      }
    })

    setNewItems(newAdded)
    setUpdateItems(updated)
    setDeleteItems(deleted)
  }, [selectedProducts, incoming])

  return {
    form,
    products,
    incoming,
    userResponsible,
    isProductsLoading,
    isIncomingLoading,
    submitted,
    createModal,
    breadcrumbData,
    defaultDraggerProps,
    selectedProducts,
    contextHolder,
    user,
    actions: {
      ProductsGET,
      IncomingIdGET,
      ProductsIncomingUsersGET,
      handleSearchProducts,
      handlePageChange,
      setSelectedProducts,
      onSelectProducts,
      editIncoming,
      deleteFiles,
    },
  }
}

export const use = useEdit
