import { Menu } from 'lucide-react'
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from './ui/button'
import NavigationSidebar from './NavigationSidebar'
import ServerSidebar from './ServerSidebar'
  

const MobileNav = ({
    serverId
}:{serverId:string}) => {
  return (
    <Sheet>
        <SheetTrigger>
            <div className='md:hidden'>
                   <Menu/>  
            </div>
        </SheetTrigger>
        <SheetContent side="left" className='p-0 flex gap-0'>
        <div className='w-[72px]'>
        <NavigationSidebar/>
        </div>
        <ServerSidebar serverId={serverId}/>
        </SheetContent>
    </Sheet>
   
  )
}

export default MobileNav