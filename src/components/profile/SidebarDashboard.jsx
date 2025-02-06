'use client';

import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
// import { SidebarMenu, Book, Star } from 'lucide-react'; // Replace with your icons
import { cn } from '@/lib/utils'; // shadcn utility for conditional classes
import { Book, Star } from 'lucide-react';
import { SidebarMenu } from '../ui/sidebar';
export default function SidebarDashboard() {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
      { name: 'Booklist', icon: Book },
      { name: 'Favorite Books', icon: Star },
    ];
  
    return (
      <div className="flex">
        {/* Mobile Sidebar */}
        <div className="block md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <SidebarMenu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[260px]">
              <SidebarContent menuItems={menuItems} />
            </SheetContent>
          </Sheet>
        </div>
  
        {/* Desktop Sidebar */}
        <aside className="hidden md:block h-screen w-full bg-gray-100 p-4 shadow-md">
          <SidebarContent menuItems={menuItems} />
        </aside>
  
      </div>
    );
  }
  
  function SidebarContent({ menuItems }) {
    return (
      <div className="flex flex-col space-y-6">
        <h2 className="text-lg font-semibold">Dashboard</h2>
        <div className="space-y-4">
          {menuItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className={cn(
                'w-full justify-start text-left text-sm font-medium',
                'hover:bg-gray-200'
              )}
            >
              <item.icon className="mr-2 h-5 w-5" />
              {item.name}
            </Button>
          ))}
        </div>
      </div>
    );
  }
  