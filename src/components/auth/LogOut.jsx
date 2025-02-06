import { doLogout } from '@/app/api/auth/route'
import React from 'react'

export default function LogOut() {
  return (
    <form action={doLogout}>
      <button type='submit' className=' font-semibold px-5 duration-300 bg-primary-800 text-white py-2 border-primary-800'>Logout</button>
    </form>
  )
}
