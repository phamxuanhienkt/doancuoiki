"use client";
import React from 'react'
import AdsterraBanner from '../page/api/add'
import QuizGame from './api/Questions';


const page = () => {
  return (
    <div className='flex flex-row justify-between m-20'>
      <AdsterraBanner/>
      <div className='w-full'><QuizGame/></div>
      
      <AdsterraBanner/>
     
    </div>
  )
}
export default page