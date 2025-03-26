'use client'

import React from 'react'

import { Button, Divider, Form, Modal } from 'antd'

import { Projects } from '@/pages/projects'
import { ProjectsRules } from '@/pages/projects/validate'
import { ColorPickerField } from '@/shared/ui/color-picker-field/color-picker-field'
import { DraggerFileField } from '@/shared/ui/dragger-file-field/dragger-file-field'
import { SelectField } from '@/shared/ui/select-field/select-field'
import { TextField } from '@/shared/ui/textfield/textfield'

import cls from './modal-create-projects.module.css'

interface Props {
  isModalOpen: boolean
  onCloseModal: () => void
}

const ModalCreateProjects: React.FC<Props> = ({ isModalOpen, onCloseModal }) => {
  const {
    warehouses,
    isCreated,
    contextHolder,
    defaultDraggerProps,
    submitted,
    form,
    selectedColor,
    color_options,
    actions: { ProjectsWarehousesGET, handleClickColor, createProduct },
  } = Projects.Hooks.List.use()

  React.useEffect(() => {
    if (isCreated) {
      onCloseModal()
    }
  }, [isCreated, onCloseModal])

  React.useEffect(() => {
    ProjectsWarehousesGET()
  }, [ProjectsWarehousesGET])

  return (
    <Modal
      className={cls.modal}
      classNames={{
        header: cls.modal__header,
        body: cls.modal__body,
        footer: cls.modal__footer,
      }}
      title="Добавить проект"
      width="800px"
      open={isModalOpen}
      centered
      onCancel={onCloseModal}
      okButtonProps={{ style: { display: 'none' } }}
      footer={[
        <Button disabled={submitted} onClick={onCloseModal} key="back">Отмена</Button>,
        <Button
          form="createProducts"
          htmlType="submit"
          type="primary"
          key="submit"
          loading={submitted}
        >
          Создать
        </Button>,
      ]}
    >
      {contextHolder}
      <Divider className={cls.divider} />
      <Form
        id="createProducts"
        className={cls.form}
        form={form}
        onFinish={createProduct}
      >
        <TextField
          name="title"
          type="text"
          label="Название проекта"
          placeholder="Введите название проекта"
          rules={ProjectsRules.InputRules}
          className={cls.form__item}
        />
        <TextField
          name="description"
          type="text"
          label="Описание"
          placeholder="Введите описание"
          className={cls.form__item}
        />
        <SelectField
          name="warehouse"
          label="Склад"
          placeholder="Выберите склад"
          className={cls.form__item}
          rules={ProjectsRules.InputRules}
          options={warehouses?.map(warehouse => ({
            title: warehouse.title,
            value: warehouse.id,
            label: warehouse.title,
          }))}
        />
        <ColorPickerField
          name="color"
          label="Выберите цвет"
          initialValue="#FA541C"
          onClick={handleClickColor}
          options={color_options}
          selectedColor={selectedColor}
        />
        <DraggerFileField
          name="image"
          valuePropName="image"
          className={cls.dragger_filed}
          {...defaultDraggerProps}
        />
      </Form>
    </Modal>
  )
}

export default ModalCreateProjects
