import { Hash } from 'lucide-react';
import React from 'react'
import MobileNav from './MobileNav';
import Image from 'next/image';
import { remdomAvatar } from '@/lib/remdomAvatar';
import { SocketIndicator } from '@/components/socket-indicator';

interface ChatheaderProps {
    serverId:string;
    name:string;
    type: "channel"|"conversation";
    imageUrl?:string;
}

const ChatHeader = ({
    serverId,
    name,
    type,
    imageUrl
}: ChatheaderProps) => {


  return (
    <div className='text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2'>
        <MobileNav serverId ={serverId}/>
        {type === "channel" && (
            <>
            <Hash className='h-5 w-5 text-zinc-500 dark:text-white mr-2'/>
            <p className='font-semibold text-md text-black dark:text-white '>
                {name}
            </p>
            <div className='flex ml-auto  items-center'>
                <SocketIndicator/>
            </div>
            </>
            
        )}
           {type === "conversation" && (
            <>
            <Image
            src= {imageUrl || "/profile.webp"}
            width={30}
            height={30}
            alt='conversation img'
            className=' object-cover rounded-full mr-4 '
            />
            <p className='font-semibold text-md text-black dark:text-white '>
                {name}
            </p>
            <div className='flex ml-auto  items-center'>
                <SocketIndicator/>
            </div>
            </>
            
        )}
    </div>
  )
}

export default ChatHeader