import React from 'react'
import { currentProfile } from './current-profile'
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import NavigationAction from './NavigationAction';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import NavigationItem from './NavigationItem';
import { ModeToggle } from './ModeToggle';
import { UserButton } from '@clerk/nextjs';

const NavigationSidebar = async () => {
    const profile =await currentProfile();
    if(!profile){
        return redirect("/");
    }
    const servers =await db.server.findMany({
        where:{
            members:{
                some:{
                    profileId: profile.id
                }
            }
        }
    });

  return (
    <div className='space-y-4 flex flex-col items-center bg-zinc-200 h-full text-primary w-full dark:bg-[#1E1F22] py-3'>
        <NavigationAction/>
        <Separator className='h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-12 mx-auto '/>
        <ScrollArea className='flex-1 w-full  '>
            {servers.map((server)=>(
                <NavigationItem
                key={server.id}
                id={server.id}
                name={server.name}
                imageUrl={server.imageUrl}
                />
            ))}

        </ScrollArea>
        <div className='pb-3 mt-auto items-center flex flex-col gap-3'>
            <ModeToggle/>
            <UserButton
            afterSignOutUrl='/'
            appearance={{
                elements:{
                    avatarBox: "h-[48px] w-[48px] rounded-full hover:rounded-2xl transition-all"
                }
            }}
            />
            
        </div>
    </div>
  )
}

export default NavigationSidebar