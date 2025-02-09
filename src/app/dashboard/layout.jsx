import SidebarBooks from '@/components/homepage/SidebarBooks'
import SidebarDashboard from '@/components/profile/SidebarDashboard'
import React from 'react'

export default function layout({ children }) {
  return (
    <div className='flex'>
      <div className='w-[20%] h-screen sticky top-0 left-0'>
      <SidebarDashboard />
      </div>
      <div className='md:px-9 py-14 md:py-5 w-full'>{children}</div>
    </div>
  )
}
