"use client";
import React from 'react'
import AdBanner from '../page/api/AdBanner'
import AdsterraBanner from '../page/api/add'

import PersonalProfile from './api/Profile' 

const page = () => {
  return (
    <div className='flex flex-row justify-between m-20'>
      <div className='w-full'>< PersonalProfile/></div>
      <div> <AdBanner/>
      <AdsterraBanner/>
      <AdsterraBanner/>
      </div>
     
    </div>
  )
}

export default page
