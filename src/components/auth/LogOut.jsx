import { doLogout } from '@/app/api/auth/route'
import { LogOutIcon } from 'lucide-react'
import React from 'react'

export default function LogOut() {
  return (
    <form action={doLogout}>
      <button type='submit' className='flex items-center gap-4'><LogOutIcon /> Logout</button>
    </form>
  )
}
