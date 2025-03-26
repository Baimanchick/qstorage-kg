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
        <h2>Проектти өзгөртүү “{projectTitle}”</h2>
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
            onFinish={(data) => EditProject(props.project_id, data)}
          >
            <TextField
              name="title"
              placeholder="Проекттин атын жазыңыз"
              label="Проекттин аталышы"
            />
            <TextField
              name="description"
              placeholder="Проекттин сүрөттөмөсүн жазыңыз"
              label="Проекттин сүрөттөмөсү"
            />

            <ColorPickerField
              name="color"
              label="Түс тандаңыз"
              onClick={handleClickColor}
              options={color_options}
              selectedColor={selectedColor}
            />

            <DraggerFileField
              label="Сүрөттү тандаңыз"
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
              Сактоо
            </Button>
          </Form>
        </div>
      </LoaderData>
    </div>
  )
}
