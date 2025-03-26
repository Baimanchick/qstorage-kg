'use client'

import React from 'react'

import { Button, Card, Flex } from 'antd'
import Image from 'next/image'

import { NoPhoto } from '@/shared/assets/images/'
import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'

import { Projects } from '..'
import Loader from '../../../../app/loading'
import cls from '../styles/view.module.css'

interface Props {
  project_id: number
}

export const View: React.FC<Props> = (props) => {
  const {
    breadcrumbData,
    items,
    expanded,
    actions: { router, ProjectsIDGET, deleteProject, getFormattedDescription, toggleDescription },
  } = Projects.Hooks.View.use()

  React.useEffect(() => {
    ProjectsIDGET(Number(props.project_id))
  }, [props.project_id, ProjectsIDGET])

  if (!items) {
    return <Loader/>
  }

  return (
    <div className="main">
      <Flex align="center" className={cls.header}>
        <Breadcrumb items={breadcrumbData} />
        <Flex className={cls.filter__panel}>
          <Button
            danger
            onClick={() => deleteProject(Number(props.project_id))}
            className={cls.btn}
          >
            Удалить
          </Button>
        </Flex>
      </Flex>

      <div className={cls.main_title}>
        <h2>Проект “{items.title}”</h2>
      </div>

      <Card
        style={{ marginTop: 16 }}
      >
        <Flex className={cls.card_container} align="start" gap={24}>
          <Image
            // eslint-disable-next-line react/no-array-index-key
            src={items.image || NoPhoto.src}
            alt={items.title}
            width={0}
            height={0}
            sizes="100vw"
            className={cls.card_image}
            priority
          />

          <div style={{ flex: 1 }}>
            <h2 style={{ marginBottom: 8 }}>{items.title}</h2>
            <p style={{ color: '#888' }}>
              Цвет: <b>{items.color}</b>
            </p>
            <p style={{ color: '#888' }}>
              Склад: <b>{items.warehouse.title}</b>
            </p>

            {getFormattedDescription()}
            {items.description && items.description.length !== 0 ? (
              items?.description.length > 185 ? (
                <button onClick={toggleDescription} className={'moreButton'}>
                  {expanded ? 'Скрыть' : 'Еще...'}
                </button>
              ) : null
            ) : null}

            <div style={{ marginTop: 24 }}>
              <Button
                type="primary"
                style={{ marginRight: 8 }}
                onClick={() => {
                  router.push(`/projects/edit/${items.id}?title=${encodeURI(items.title)}`)
                }}
              >
                Изменить проект
              </Button>
            </div>
          </div>
        </Flex>
      </Card>
    </div>
  )
}
