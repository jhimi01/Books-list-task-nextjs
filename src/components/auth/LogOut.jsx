import { doLogout } from '@/app/api/auth/route'
import React from 'react'

export default function LogOut() {
  return (
    <form action={doLogout}>
      <button type='submit'>Logout</button>
    </form>
  )
}
