'use client'
import React from 'react'

import { Dayjs } from 'dayjs'

function useList() {
  const [yearValue, setYearValue] = React.useState<Dayjs | null>(null)
  const [monthValue, setMonthValue] = React.useState<Dayjs | null>(null)
  const [dayValue, setDayValue] = React.useState<Dayjs | null>(null)
  const handleChangeYearDatePicker = React.useCallback((newYear: Dayjs | null) => {
    if (!newYear) {
      setYearValue(null)
      setMonthValue(null)
      setDayValue(null)

      return
    }

    setYearValue(newYear)
    setMonthValue(prev => (prev ? prev.year(newYear.year()) : newYear))
    setDayValue(prev => (prev ? prev.year(newYear.year()) : newYear))
  }, [])

  const handleChangeMonthDatePicker = React.useCallback((newMonth: Dayjs | null) => {
    if (!newMonth) {
      setMonthValue(null)
      setDayValue(null)

      return
    }

    setMonthValue(newMonth)
    setYearValue(prev => (prev ? prev.year(newMonth.year()) : newMonth))
    setDayValue(prev => {
      if (!prev) {
        return newMonth.date(1)
      }

      return prev.year(newMonth.year()).month(newMonth.month())
    })
  }, [])

  const handleChangeDayDatePicker = React.useCallback((newDay: Dayjs | null) => {
    setDayValue(newDay)

    if (!newDay) {
      return
    }

    setYearValue(prev => (prev ? prev.year(newDay.year()) : newDay))
    setMonthValue(prev => (prev ? prev.year(newDay.year()).month(newDay.month()) : newDay))
  }, [])

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/analysis', title: 'Анализы' },
  ]

  const navigation_data = [
    { id: 1, project_name: 'СтартАп', number: 145320 },
    { id: 2, project_name: 'Альфа', number: 278492 },
    { id: 3, project_name: 'Бета', number: 319134 },
    { id: 4, project_name: 'Гамма', number: 87456 },
    { id: 5, project_name: 'Дельта', number: 194567 },
    { id: 6, project_name: 'Эпсилон', number: 253789 },
    { id: 7, project_name: 'Омега', number: 421890 },
  ]

  return {
    breadcrumbData,
    navigation_data,
    yearValue,
    monthValue,
    dayValue,
    actions: {
      handleChangeYearDatePicker,
      handleChangeMonthDatePicker,
      handleChangeDayDatePicker,
    },
  }
}

export const use = useList
