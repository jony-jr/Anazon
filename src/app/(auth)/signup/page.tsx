import React from 'react'
import RegisterForm from './RegisterForm'
import { josefinSans } from '@/app/layout'

export default function Register() {
  return (
    <main className='flex justify-center flex-col items-center gap-3 mt-25'>
      <h1 className={ `${josefinSans.className} font-extrabold text-blue-950 text-4xl md:text-7xl  select-none`}>Register</h1>
      <RegisterForm/>
    </main>
  )
}
