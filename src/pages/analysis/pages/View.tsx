'use client'

import React from 'react'

import { CaretDownOutlined, CaretUpOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { Button, Card, Col, Divider, Flex, Progress, Row, Spin } from 'antd'
import dynamic from 'next/dynamic'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { DatePickerField } from '@/shared/ui/date-picker-field/date-picker-field'

import { Analysis } from '..'
import cls from '../styles/view.module.css'

const AreaCharts = dynamic(() => import('../ui/area-charts/area-charts').then(m => m.AreaCharts), {
  ssr: false,
  loading: () =>     (
    <Flex justify="center" align="center" className={cls.spinner}>
      <Spin size="large" />
    </Flex>
  ),
})

const BarCharts = dynamic(() => import('../ui/bar-charts/bar-charts').then(m => m.BarCharts), {
  ssr: false,
  loading: () =>     (
    <Flex justify="center" align="center" className={cls.spinner}>
      <Spin size="large" />
    </Flex>
  ),
})

const DetailedBarCharts = dynamic(() => import('../ui/detailed-bar-charts/detailed-bar-charts').then(m => m.DetailedBarCharts), {
  ssr: false,
  loading: () =>     (
    <Flex justify="center" align="center" className={cls.spinner}>
      <Spin size="large" />
    </Flex>
  ),
})

export const View = () => {
  const {
    breadcrumbData,
    navigation_data,
    dayValue,
    monthValue,
    yearValue,
    actions: {
      handleChangeDayDatePicker,
      handleChangeMonthDatePicker,
      handleChangeYearDatePicker,
    },
  } = Analysis.Hooks.List.use()

  return (
    <div className="main">
      <Flex className={cls.navigation__info}>
        <Breadcrumb items={breadcrumbData}/>
        <h2 className={cls.main_title}>Анализы</h2>
      </Flex>
      <Flex className={cls.header} justify={'space-between'}>
        <Flex gap={4} className={cls.btn_container}>
          <Button className={cls.btn} type="primary">
            Приход
          </Button>
          <Button className={cls.btn} type="default">
            Уход
          </Button>
        </Flex>
        <Flex className={cls.filter_panel}>
          <DatePickerField
            pickerMode="year"
            placeholder="Выберите год"
            value={yearValue}
            onChange={handleChangeYearDatePicker}
          />
          <DatePickerField
            pickerMode="month"
            placeholder="Выберите месяц"
            value={monthValue}
            onChange={handleChangeMonthDatePicker}
          />
          <DatePickerField
            placeholder="Выберите день"
            value={dayValue}
            onChange={handleChangeDayDatePicker}
          />
        </Flex>
      </Flex>

      <Row className={cls.analysis_main} justify="space-between" gutter={[4, 8]}>
        <Col>
          <Card className={cls.card} classNames={{ body: cls.card_body }}>
            <Flex className={cls.card_header}>
              <span className={cls.rest}>Общий остаток</span>
              <InfoCircleOutlined className={cls.info_icon} size={16} />
            </Flex>
            <Flex className={cls.card_info}>
              <h2 className={cls.card_title}>KGS 140,000</h2>
              <Flex className={cls.card_info_container}>
                <h3 className={cls.card_text}>
                  WoW Change 12% <CaretUpOutlined className={cls.icon_up} />
                </h3>
                <h3 className={cls.card_text}>
                  DoD Change 11% <CaretDownOutlined className={cls.icon_down} />
                </h3>
              </Flex>
            </Flex>
            <Divider className={cls.divider}/>
            <Flex gap={8}>
              <h3 className={cls.card_text}>Ежедневный приход</h3>
              <h3 className={cls.card_text}>KGS 12,423</h3>
            </Flex>
          </Card>
        </Col>
        <Col>
          <Card className={cls.card} classNames={{ body: cls.card_body }}>
            <Flex className={cls.card_header}>
              <span className={cls.rest}>Рейтинг</span>
              <InfoCircleOutlined className={cls.info_icon} size={16} />
            </Flex>
            <Flex className={cls.card_info}>
              <h2 className={cls.card_title}>8,846</h2>
              <div className={cls.analysis} >
                <AreaCharts/>
              </div>
            </Flex>
            <Divider className={cls.divider}/>
            <Flex gap={8}>
              <h3 className={cls.card_text}>Ежедневный</h3>
              <h3 className={cls.card_text}>1,234</h3>
            </Flex>
          </Card>
        </Col>
        <Col>
          <Card className={cls.card} classNames={{ body: cls.card_body }}>
            <Flex className={cls.card_header}>
              <span className={cls.rest}>Уход</span>
              <InfoCircleOutlined className={cls.info_icon} size={16} />
            </Flex>
            <Flex className={cls.card_info}>
              <h2 className={cls.card_title}>8,846</h2>
              <div className={cls.analysis} >
                <BarCharts/>
              </div>
            </Flex>
            <Divider className={cls.divider}/>
            <Flex gap={8}>
              <h3 className={cls.card_text}>Коэффициент конверсии</h3>
              <h3 className={cls.card_text}>60%</h3>
            </Flex>
          </Card>
        </Col>
        <Col>
          <Card className={cls.card} classNames={{ body: cls.card_body }}>
            <Flex className={cls.card_header}>
              <span className={cls.rest}>План заработка</span>
              <InfoCircleOutlined className={cls.info_icon} size={16} />
            </Flex>
            <Flex className={cls.card_info}>
              <h2 className={cls.card_title}>78%</h2>
              <Flex className={`${cls.analysis} ${cls.main_progress}`}>
                <Progress status="active" className={cls.progress} percent={78} />
              </Flex>
            </Flex>
            <Divider className={cls.divider}/>
            <Flex gap={8}>
              <h3 className={cls.card_text}>Коэффициент конверсии</h3>
              <h3 className={cls.card_text}>60%</h3>
            </Flex>
          </Card>
        </Col>
      </Row>
      <div className={cls.graph}>
        <Flex justify={'space-between'} align={'flex-start'} className={cls.graph_container}>
          <DetailedBarCharts/>
          <Flex className={cls.statistics}>
            <h2 className={cls.graph_main_title}>Статистика прихода</h2>
            <ul className={cls.graph_navigation}>
              {navigation_data.map((item) => (
                <div className={cls.graph_navigation__item} key={item.id}>
                  <div className={cls.circle}>{item.id}</div>
                  <li>{item.project_name}</li>
                  <span>{item.number}</span>
                </div>
              ))}
            </ul>
          </Flex>
        </Flex>
      </div>
    </div>
  )
}
