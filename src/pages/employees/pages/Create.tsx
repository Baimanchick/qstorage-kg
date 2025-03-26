'use client'

import React from 'react'

import { Button, Flex, Form, Radio } from 'antd'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { TextField } from '@/shared/ui/textfield/textfield'

import { Employees } from '..'
import cls from '../styles/create.module.css'

export const Create = () => {
  const {
    breadcrumbData,
    submitted,
    actions: {
      CreateEmployee,
    },
  } = Employees.Hooks.Create.use()

  return (
    <div className="main">
      <Flex className={cls.employee}>
        <div className={cls.navigation__info}>
          <Breadcrumb items={breadcrumbData}/>
        </div>

        <Flex className={cls.main_title}>
          <h2>Кызматкер түзүү</h2>
        </Flex>

        <Flex className={cls.main_form}>
          <Form className={cls.form} onFinish={(data) => CreateEmployee(data)}>
            <TextField name="first_name" placeholder="Колдонуучунун атын киргизиңиз" label="Кызматкердин аты" rules={[{ required: true, message: 'Талаа сөзсүз' }]} />
            <TextField name="last_name" placeholder="Колдонуучунун фамилиясын киргизиңиз" label="Кызматкердин фамилиясы" rules={[{ required: true, message: 'Талаа сөзсүз' }]} />
            <TextField name="surname" placeholder="Колдонуучунун атасын атын киргизиңиз" label="Кызматкердин атасынын аты" />
            <TextField name="email" placeholder="Колдонуучунун email дарегин киргизиңиз" label="Кызматкердин Email'и" rules={[{ required: true, message: 'Талаа сөзсүз' }]} />
            <Form.Item name={'role'} label="Ролду тандаңыз" rules={[{ required: true, message: 'Талаа сөзсүз' }]} className={cls.radio_field}>
              <Radio.Group>
                <Radio value={'manager'}>Менеджер</Radio>
                <Radio value={'worker'}>Работник</Radio>
                <Radio value={'director'}>Директор</Radio>
              </Radio.Group>
            </Form.Item>
            <Button htmlType="submit" type="primary" className={cls.btn} loading={submitted}>Сактоо</Button>
          </Form>
        </Flex>

      </Flex>
    </div>
  )
}
