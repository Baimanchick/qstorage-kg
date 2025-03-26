'use client'

import React from 'react'

import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Table, Tag, Flex, Button, Popover, Typography, Pagination } from 'antd'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import Link from 'next/link'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'

import { ProductsOutgoing } from '..'
import cls from '../styles/list.module.css'
import { ProductsOutgoingTypes } from '../types'

const { Paragraph } = Typography

const createColumns = (checkStatus: any, getTagColor: any): ColumnsType<ProductsOutgoingTypes.Table> => {
  const columns: ColumnsType<ProductsOutgoingTypes.Table> = [
    {
      title: 'Уход ID',
      dataIndex: 'id',
      key: 'id',
      render: (_, record) => (
        <Link href={`/products/outgoing/${record.id}/`}>QSTR-{record.id}</Link>
      ),
    },
    {
      title: 'Документтин номери',
      dataIndex: 'act',
      key: 'act',
      render: (_, record) => (
        <Link href={`${record.document}`}>#{record.act}</Link>
      ),
    },
    {
      title: 'Товарлардын саны',
      dataIndex: 'total_quantity',
      key: 'total_quantity',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getTagColor(status)}>{checkStatus(status)}</Tag>
      ),
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => {
        const formatted = dayjs(date).format('DD.MM.YYYY')

        return <span>{formatted}</span>
      },
    },
    {
      title: 'Жеткирүүчү',
      dataIndex: 'supplier',
      key: 'supplier',
    },
    {
      title: 'Жооптуу',
      dataIndex: 'responsible',
      key: 'responsible',
      render: (responsible: ProductsOutgoingTypes.Responsible) => (
        <Link href={`/users/${responsible.uuid}`}>{`${responsible.first_name} ${responsible.last_name}`}</Link>
      ),
    },
    {
      title: 'Комментарий',
      dataIndex: 'message',
      key: 'message',
      render: (comment: string) => (
        <Popover overlayClassName={cls.card} className={cls.custom__popover} content={comment}>
          <Paragraph>{!comment ? '' : `${comment.slice(0, 10)}...`}...</Paragraph>
        </Popover>
      ),
    },
  ]

  return columns
}

export const ListProductsIncoming: React.FC = () => {
  const {
    breadcrumbData,
    productsOutgoingList,
    currentPage,
    actions: {
      router,
      ProductsOutgoingGET,
      checkStatus,
      setCurrentPage,
      getTagColor,
      handlePageChange,
    },
  } = ProductsOutgoing.Hooks.List.use()

  React.useEffect(() => {
    ProductsOutgoingGET()
  }, [])

  return (
    <div>
      <div className="main">
        <div className={cls.navigation__info}>
          <Breadcrumb items={breadcrumbData}/>
          <h2>Товар Уход</h2>
        </div>
        <div className={cls.header}>
          <Flex gap={8} className={cls.header__btn}>
            <Button type="default" onClick={() => router.push('/products/incoming')} className={cls.btn_switch}>
              Приход <ArrowUpOutlined />
            </Button>
            <Button type="primary" className={cls.btn_switch}>
              Уход <ArrowDownOutlined />
            </Button>
          </Flex>
          <Flex gap={10} className={cls.filter_and_btn}>
            <Button type="primary" onClick={() => router.push('/products/outgoing/create')} className={cls.btn}>
              Уход кошуу
            </Button>
          </Flex>
        </div>
        <Table<ProductsOutgoingTypes.Table>
          columns={createColumns(checkStatus, getTagColor)}
          dataSource={productsOutgoingList?.results || []}
          rowKey={(record) => record.id}
          loading={!productsOutgoingList?.results}
          scroll={{ x: 'max-content' }}
          rootClassName={cls.table}
          pagination={false}
          rowClassName={(_, index) => (index % 2 !== 0 ? cls.evenRow : cls.oddRow)}
          expandable={{
            rowExpandable: (record) => record.items && record.items.length > 0,
            expandedRowRender: (record) => (
              <Table
                columns={[
                  {
                    title: 'Товар',
                    dataIndex: 'product_title',
                    key: 'product_title',
                    render: (_, record) => (
                      <Link href={`/product/${record.product.slug}`}>{record.product_title}</Link>
                    ),
                  },
                  { title: 'Саны', dataIndex: 'quantity', key: 'quantity' },
                  { title: 'Сатып алуу баасы', dataIndex: 'purchase_price', key: 'purchase_price' },
                  { title: 'Жалпы сумма', dataIndex: 'total_price', key: 'total_price' },
                ]}
                dataSource={record.items}
                rowKey={(item) => item.product.slug ? item.product.slug : ''}
                pagination={false}
                size="small"
              />
            ),
          }}
        />

        <Pagination
          className={cls.pagination}
          total={productsOutgoingList?.count}
          current={currentPage}
          pageSize={10}
          onChange={(page) => {
            setCurrentPage(page)
            handlePageChange(page)
          }}
        />
      </div>
    </div>
  )
}
