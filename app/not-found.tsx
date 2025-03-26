'use client'

import { Button, Result } from 'antd'
import { useRouter } from 'next/navigation'

export default function NotFoundPage() {
  const router = useRouter()

  return (
    <Result
      status="404"
      title="Баракча табылган жок (404)"
      subTitle="Сиз керек эмес жерге кирип калдыңыз окшойт!"
      extra={<Button type="primary" onClick={() => router.push('/products/incoming')}>Башкы бетке кайтуу</Button>}
    />
  )
}
