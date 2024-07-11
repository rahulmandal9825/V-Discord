"use client";
import React from 'react'
import { ActionTooltip } from './acion-tooltip';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useParams, useRouter } from 'next/navigation';


interface navigationitemprops {
    id : string;
    name: string;
    imageUrl:string;
}
const NavigationItem = ({
    id,
    name,
    imageUrl
}:navigationitemprops) => {
    const params =useParams();
    const router = useRouter();

    const onclick = () =>{
        router.push(`/servers/${id}`);
    }
  return (
    <div className='mb-5'>
        <ActionTooltip
        label={name}
        side='right'
        align='center'
        >

        <button
        onClick={onclick}
         className='group relative flex items-center'>
            <div className={cn("absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
                params?.serverId !== id && "group-hover:h-[20px]",
                params?.serverId === id ? "h-[36px]" : "h-[8px]"
            )}/>

            <div className={cn("relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
                params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]"
            )}>
            <Image
            fill
            src={imageUrl}
            alt='server imag'
            className='aspect-square object-cover'
            />
            </div>
        </button>   
          </ActionTooltip>
    </div>
  )
}

export default NavigationItem