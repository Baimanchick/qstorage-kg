'use client'

import React from 'react'

import { Breadcrumb, Button, Flex, Form } from 'antd'

import { ColorPickerField } from '@/shared/ui/color-picker-field/color-picker-field'
import { DraggerFileField } from '@/shared/ui/dragger-file-field/dragger-file-field'
import { LoaderData } from '@/shared/ui/loader/Loader'
import { TextField } from '@/shared/ui/textfield/textfield'

import { Projects } from '..'
import cls from '../styles/edit.module.css'

interface Props {
  project_id: string
}

export const Edit: React.FC<Props> = (props) => {
  const {
    breadcrumbData,
    items,
    submitted,
    form,
    color_options,
    selectedColor,
    isProjectsLoading,
    contextHolder,
    projectTitle,
    defaultDraggerProps,
    initialImageFileList,
    actions: { ProjectsIDGET, EditProject, handleClickColor, setSelectedColor },
  } = Projects.Hooks.Edit.use()

  React.useEffect(() => {
    ProjectsIDGET(Number(props.project_id))
  }, [props.project_id, ProjectsIDGET])

  React.useEffect(() => {
    if (items && items.color) {
      form.setFieldsValue({ color: items.color })
      setSelectedColor(items.color)
    }
  }, [items, form])

  return (
    <div className="main">
      {contextHolder}
      <Flex className={cls.header}>
        <Breadcrumb items={breadcrumbData} />
      </Flex>

      <Flex className={cls.main_title}>
        <h2>Изменить проект “{projectTitle}”</h2>
      </Flex>

      <LoaderData isLoading={isProjectsLoading} data={items}>
        <div className={cls.main_form}>
          <Form
            form={form}
            className={cls.Form}
            initialValues={{
              ...items,
              image: initialImageFileList,
            }}
            // onFinish={(data) => console.log(data)}
            onFinish={(data) => EditProject(props.project_id, data)}
          >
            <TextField
              name="title"
              placeholder="Введите название проекта"
              label="Название проекта"
            />
            <TextField
              name="description"
              placeholder="Введите описание проекта"
              label="Описание проекта"
            />

            <ColorPickerField
              name="color"
              label="Выберите цвет"
              onClick={handleClickColor}
              options={color_options}
              selectedColor={selectedColor}
            />

            <DraggerFileField
              label="Выберите картинку"
              name="image"
              valuePropName="fileList"
              className={cls.dragger_filed}
              {...defaultDraggerProps}
            />

            <Button
              htmlType="submit"
              type="primary"
              className={cls.btn}
              loading={submitted}
            >
              Сохранить
            </Button>
          </Form>
        </div>
      </LoaderData>
    </div>
  )
}
