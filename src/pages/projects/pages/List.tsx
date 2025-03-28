'use client'

import React from 'react'

import { BorderlessTableOutlined } from '@ant-design/icons'
import { Button, Flex, List as ListAntd } from 'antd'
import Image from 'next/image'

import { NoPhoto } from '@/shared/assets/images/'
import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'

import { Projects } from '..'
import cls from '../styles/list.module.css'
import ModalCreateProjects from '../ui/modals/ModalCreate/modal-create-projects'

export const List = () => {
  const { breadcrumbData, projects, actions:{ createModal, ProjectsGET, router } } = Projects.Hooks.List.use()

  // TODO перенести useCreateProduct в этот используемый hook
  React.useEffect(() => {
    if (!createModal.isOpen) {
      ProjectsGET()
    }
  }, [createModal.isOpen])

  return (
    <div>
      <div className="main">
        <Flex className={cls.header}>
          <Breadcrumb items={breadcrumbData}/>
          <Flex className={cls.filter__panel}>
            <Button onClick={createModal.onOpen} className={cls.btn} type="primary">
              Проект кошуу
            </Button>
          </Flex>
        </Flex>
        <div className={cls.main_title}>
          <h2>Проекттер</h2>
        </div>
        <ListAntd
          size={'small'}
          grid={{
            gutter: 16,
            column: 7,
            xxl: 7,
            xl: 7,
            lg: 4,
            md: 3,
            sm: 2,
            xs: 2,
          }}
          loading={!projects}
          dataSource={projects}
          renderItem={(item) => (
            <ListAntd.Item
              key={item.id}
              style={{
                background: 'transparent',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                padding: 0,
              }}
            >
              <div onClick={() => router.push(`/projects/${item.id}`)} style={{ borderColor: `${item.color}` }} className={cls.card}>
                <Flex justify={'center'}>
                  <Image
                    width={0}
                    height={120}
                    sizes="100vw"
                    style={{ width: '100%' }}
                    className={cls.card_image}
                    src={item.image || NoPhoto.src}
                    alt={item.title}
                    priority={true}
                  />
                </Flex>
                <div className={cls.card__info}>
                  <h2><BorderlessTableOutlined/> {item.title}</h2>
                  <p>{item.color}</p>
                </div>
              </div>
            </ListAntd.Item>
          )}
        />
      </div>
      <ModalCreateProjects
        onCloseModal={createModal.onClose}
        isModalOpen={createModal.isOpen}
      />
    </div>
  )
}
