import { AppstoreOutlined, BarsOutlined, DownloadOutlined, LogoutOutlined, ProfileOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd'

  type MenuItem = Required<MenuProps>['items'][number];

export const EmployeeSidebarMenuRoutes: MenuItem[] = [
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
    key: '/history',
    label: 'История',
    icon: <ProfileOutlined />,
  },
]
