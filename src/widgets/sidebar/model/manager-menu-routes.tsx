import {
  AppstoreOutlined, BarChartOutlined, BarsOutlined, CalendarOutlined,
  DownloadOutlined, LogoutOutlined, ProfileOutlined,
  ShopOutlined, TableOutlined, TeamOutlined,
} from '@ant-design/icons'
import { MenuProps } from 'antd'

import { QStorageLogoLight } from '@/shared/assets/icons'

type MenuItem = Required<MenuProps>['items'][number];

export const ManagerSidebarMenuRoutes: MenuItem[] = [
  // {
  //   key: 'logo',
  //   icon: <QStorageLogoLight />,
  //   className: 'logo',
  // },
  {
    key: '/warehouses',
    label: 'Склад',
    icon: <ShopOutlined />,
  },
  {
    key: '/products/incoming',
    label: 'Приход',
    icon: <DownloadOutlined />,
  },
  {
    key: '/products/outgoing',
    label: 'Уход',
    icon: <LogoutOutlined />,
  },
  {
    key: '/products/items',
    label: 'Бардыгы товарлар',
    icon: <AppstoreOutlined />,
  },
  {
    key: '/stock',
    label: 'Калган товарлар',
    icon: <BarsOutlined />,
  },
  {
    key: '/projects',
    label: 'Проект',
    icon: <TableOutlined />,
  },
  {
    key: '/storage-requests',
    label: 'Заявки на склад',
    icon: <CalendarOutlined />,
  },
  {
    key: '/employees',
    label: 'Персонал',
    icon: <TeamOutlined />,
  },
  {
    key: '/history',
    label: 'История',
    icon: <ProfileOutlined />,
  },
  {
    key: '/analysis',
    label: 'Анализ поступлений',
    icon: <BarChartOutlined />,
  },
]
