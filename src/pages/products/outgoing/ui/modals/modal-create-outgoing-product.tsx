'use client'

import React from 'react'

import { Button, Divider, Flex, Form, Modal } from 'antd'

import { DatePickerField } from '@/shared/ui/date-picker-field/date-picker-field'
import { DraggerFileField } from '@/shared/ui/dragger-file-field/dragger-file-field'
import { DynamicField } from '@/shared/ui/dynamic-field/dynamic-field'
import { SelectField } from '@/shared/ui/select-field/select-field'
import { TextField } from '@/shared/ui/textfield/textfield'

import { ProductsOutgoing } from '../..'
import { InputRules } from '../../validate'

import cls from './modal-create-outgoing-product.module.css'

interface Props {
  isModalOpen: boolean
  onCloseModal: () => void
}

const ModalCreateOutgoingItem: React.FC<Props> = ({ isModalOpen, onCloseModal }) => {
  const {
    contextHolder,
    submitted,
    form,
    isCreated,
    productsColorsList,
    defaultDraggerProps,
    actions: { createProduct, ProductsColorsGET },
  } = ProductsOutgoing.Hooks.CreateProduct.use()

  React.useEffect(() => {
    if (isCreated) {
      onCloseModal()
    }
  }, [isCreated, onCloseModal])

  React.useEffect(() => {
    ProductsColorsGET()
  }, [ProductsColorsGET])

  return (
    <Modal
      className={cls.modal}
      classNames={{
        header: cls.modal__header,
        body: cls.modal__body,
        footer: cls.modal__footer,
      }}
      title="Товар кошуу"
      width="800px"
      open={isModalOpen}
      centered
      onCancel={onCloseModal}
      okButtonProps={{ style: { display: 'none' } }}
      footer={[
        <Button disabled={submitted} onClick={onCloseModal} key="back">Жокко чыгаруу</Button>,
        <Button
          form="createProducts"
          htmlType="submit"
          type="primary"
          key="submit"
          loading={submitted}
          style={{ boxShadow: 'none', border: 'none' }}
        >
          Кошуу
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
          label="Продукттун аталышы"
          placeholder="Продукттун атын жазыңыз"
          rules={InputRules.Field}
          className={cls.form__item}
        />
        <TextField
          name="price"
          type="number"
          label="Баасы"
          placeholder="Баасын жазыңыз"
          rules={InputRules.Field}
          className={cls.form__item}
        />
        <TextField
          name="description"
          type="text"
          label="Сүрөттөмө"
          placeholder="Продукт жөнүндө сүрөттөмө жазыңыз"
          className={cls.form__item}
        />
        <DatePickerField
          name="expiration_date"
          label="Сактоо мөөнөтү"
          placeholder="Товардын жарактуулук мөөнөтүн жазыңыз"
          className={cls.form__item}
        />
        <SelectField
          name="color"
          label="Түсү"
          placeholder="Түсүн тандаңыз"
          className={cls.form__item}
          options={productsColorsList?.map(color => ({
            title: color.name,
            value: color.id,
            label: (
              <Flex className={cls.color_picker_main} gap={5}>
                <div>{color.name}</div>
                <div className={cls.color_square} style={{ background: `${color.hash_code}` }}/>
              </Flex>
            ),
          }))}
        />
        <DynamicField
          listName="characteristics"
          className={cls.form__item}
          buttonAddLabel="Мүнөздөмө кошуу"
          rules={InputRules.Field}
        />
        <DraggerFileField
          name="images"
          valuePropName="images"
          label="Файлды тандаңыз"
          className={cls.dragger_filed}
          {...defaultDraggerProps}
        />
      </Form>
    </Modal>
  )
}

export default ModalCreateOutgoingItem
