import SidebarBooks from '@/components/homepage/SidebarBooks'
import SidebarDashboard from '@/components/profile/SidebarDashboard'
import React from 'react'

export default function layout({ children }) {
  return (
    <div className='flex'>
      <SidebarDashboard />
      <div className='px-9 py-5 w-full'>{children}</div>
    </div>
  )
}
