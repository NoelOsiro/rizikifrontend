import DefaultLayout from '@/components/Layouts/DefaultLayout'
import OrderPage from '@/components/Order'
import React from 'react'

type Props = {}

const Orders = (props: Props) => {
  return (
    <DefaultLayout>
      <OrderPage />
    </DefaultLayout>
  )
}

export default Orders