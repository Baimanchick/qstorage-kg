'use client'

import React from 'react'

import { Space, Table, Flex } from 'antd'
import { ColumnsType } from 'antd/es/table'
import Image from 'next/image'
import Link from 'next/link'

import { NoPhoto } from '@/shared/assets/images/'
import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'

import { Stock } from '..'
import cls from '../styles/view.module.css'
import { StockType } from '../types'

const createColumns = (): ColumnsType<StockType.Product> => {
  const columns: ColumnsType<StockType.Product> = [
    {
      title: 'Товар',
      dataIndex: 'product',
      key: 'product',
      render: (_, record) => (
        <Space>
          <Image
            src={record.image || NoPhoto.src}
            alt={record.title}
            style={{ objectFit: 'cover' }}
            width={50}
            height={40}
            className={cls.table_image}
          />
          <Link href={`/products/items/${record.slug}/`}>{record.title}</Link>
        </Space>
      ),
    },
    {
      title: 'Калдык',
      dataIndex: 'stock',
      key: 'stock',
    },
  ]

  return columns
}

export const View = () => {
  const {
    breadcrumbData,
    stock,
    currentPage,
    actions: {
      StockGET,
      setCurrentPage,
    } } = Stock.Hooks.View.use()

  React.useEffect(() => {
    StockGET()
  }, [])

  return (
    <div className="main">

      <Flex className={cls.nav}>
        <Breadcrumb items={breadcrumbData}/>
      </Flex>

      <Flex className={cls.inventory_info}>
        <h2>Товар калдыктары “Склад №1”</h2>
        <div className={cls.inventory_info_main}>
          <div className={cls.inventory_info_container}>
            <Flex className={cls.inventory_info_item}>
              <div>
                <h3 className={cls.sub_title}>Жалпы калдык</h3>
                <span className={cls.stock_number}>{stock?.results.total_stock}</span>
              </div>
            </Flex>
          </div>
        </div>
      </Flex>

      <Table<StockType.Product>
        columns={createColumns()}
        dataSource={stock?.results.products}
        rowKey={(record) => record.slug}
        loading={!stock}
        scroll={{ x: 'max-content' }}
        pagination={{
          position: ['bottomRight'],
          total: stock?.count,
          current: currentPage,
          pageSize: 10,
          onChange: (page) => {
            setCurrentPage(page)
            StockGET(page)
          },
        }}
      />
    </div>
  )
}
