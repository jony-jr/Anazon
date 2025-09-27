import React from 'react'
import Loader from './_Components/Loader/Loader'
export default function loading() {
  return (
    <section className='h-dvh bg-white dark:bg-gray-950 flex  justify-center items-center -mt-22'>
       <Loader/>
    </section>
  )
}
