import React from 'react'
import AdBanner from '../page/api/AdBanner'
import AdsterraBanner from '../page/api/add'
import VideoHictory from '../page/api/history'
import Profile from '../page/api/profile'

const page = () => {
  return (
    <div className='flex flex-row justify-between m-20'>
      <div><VideoHictory/> </div>
      <div className='w-[40%]'>< Profile/></div>
      <div> <AdBanner/>
      <AdsterraBanner/>
      <AdsterraBanner/>
      </div>
     
    </div>
  )
}

export default page
