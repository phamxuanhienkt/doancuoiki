import React from 'react'
import RootLayout from '../layout'
import Onboarding from './api/onbroading'

const page = () => {
  return (
    <RootLayout hideHeader={true} hideFooter={true}>
      <div className="text-center p-8">
        <div><Onboarding/></div>
      </div>
    </RootLayout>
  )
}

export default page