'use client'

import React from 'react'

import { Table, Flex, Tag, Pagination } from 'antd'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import Link from 'next/link'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { SelectField } from '@/shared/ui/select-field/select-field'

import { History } from '..'
import cls from '../styles/list.module.css'
import { HistoryTypes } from '../types'

const createColumns = (checkStatus: any, getTagColor: any, getModelName: any): ColumnsType<HistoryTypes.Item> => {
  const columns: ColumnsType<HistoryTypes.Item> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (_, record) => (
        <Link href={'/products/incoming/'}>QSTR-{record.id}</Link>
      ),
    },
    {
      title: 'Иш-аракет',
      dataIndex: 'action',
      key: 'action',
      render: (action: string) => (
        <Tag color={getTagColor(action)}>{checkStatus(action)}</Tag>
      ),
    },
    {
      title: 'Түрү',
      dataIndex: 'model_name',
      key: 'model_name',
      render: (model_name: string) => (
        <span>{getModelName(model_name)}</span>
      ),
    },
    {
      title: 'Дата',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp: string) => {
        const formatted = dayjs(timestamp).format('DD.MM.YYYY')

        return (
          <span>{formatted}</span>
        )
      },
    },
  ]

  return columns
}

export const List = () => {
  const {
    breadcrumbData,
    history,
    isHistoriesLoading,
    selectedAction,
    selectedModel,
    selectedUser,
    users,
    actions: {
      getHistories,
      checkStatus,
      getTagColor,
      getModelName,
      handlePageChange,
      setSelectedAction,
      setSelectedModel,
      setSelectedUser,
      getUsers,
    },
  } = History.Hooks.List.use()

  React.useEffect(() => {
    const actionFilter = selectedAction === 'all' ? undefined : selectedAction
    const modelFilter = selectedModel === 'all' ? undefined : selectedModel
    const userFilter = selectedUser === 'all' ? undefined : selectedUser

    getHistories(undefined, modelFilter, actionFilter, userFilter)
    getUsers()
  }, [selectedAction, selectedModel, selectedUser])

  return (
    <div className="main">
      <Flex className={cls.nav}>
        <Breadcrumb items={breadcrumbData}/>
      </Flex>

      <Flex className={cls.inventory_info}>
        <h2>Тарых</h2>
        <div className={cls.inventory_info_main}>
          <div className={cls.inventory_info_container}>
            <Flex className={cls.filter} gap={10}>
              <SelectField
                name="actions"
                options={[
                  { value: 'all', label: 'Бардыгы' },
                  {
                    value: 'created',
                    label: 'ЖАРАТУУ',
                  },
                  {
                    value: 'updated',
                    label: 'ӨЗГӨРТҮҮ',
                  },
                  {
                    value: 'deleted',
                    label: 'ӨЧҮРҮҮ',
                  },
                  {
                    value: 'verified',
                    label: 'ТЕКШЕРҮҮ',
                  },
                ]}
                placeholder={'Иш-аракет'}
                style={{ width: '150px' }}
                onChange={(value) => setSelectedAction(value)}
                allowClear
              />
              <SelectField
                name="model_name"
                options={[
                  { value: 'all', label: 'Бардыгы' },
                  {
                    value: 'Incoming',
                    label: 'Приход',
                  },
                  {
                    value: 'Outgoing',
                    label: 'Уход',
                  },
                ]}
                placeholder={'Приход/Уход'}
                style={{ width: '150px' }}
                onChange={(value) => setSelectedModel(value)}
                allowClear
              />

              <SelectField
                name="user"
                options={[
                  { value: 'all', label: 'Бардыгы' },
                  ...users?.map((item) => ({
                    value: item.uuid,
                    label: `${item.first_name} ${item.last_name}`,
                  })) || [],
                ]}
                placeholder={'Колдонуучулар'}
                style={{ width: '150px' }}
                onChange={(value) => setSelectedUser(value)}
                allowClear
              />
            </Flex>
            <Flex className={cls.inventory_info_item}>
              <Table
                columns={createColumns(checkStatus, getTagColor, getModelName)}
                dataSource={history?.results}
                loading={isHistoriesLoading}
                scroll={{ x: 'max-content' }}
                rootClassName={cls.table}
                rowKey={(record) => record.id}
                rowClassName={(_, index) => (index % 2 !== 0 ? cls.evenRow : cls.oddRow)}
                pagination={false}
              />
            </Flex>
            <Pagination
              className={cls.pagination}
              total={history?.count}
              pageSize={10}
              onChange={() => {
                handlePageChange()
              }}
            />
          </div>
        </div>
      </Flex>
    </div>
  )
}
