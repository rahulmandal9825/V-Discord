"use client";
import { cn } from '@/lib/utils';
import { Channel, ChannelType, MemberRole, Server } from '@prisma/client'
import { Edit, Hash, Lock, Mic, Trash, Video } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react'
import { ActionTooltip } from './acion-tooltip';
import { ModalType, useModal } from '@/hooks/use-model-store';


interface ServerChannelProps {
    channel: Channel;
    server: Server;
    role?:MemberRole;
}

const iconMap ={
    [ChannelType.TEXT] : Hash,
    [ChannelType.AUDIO] : Mic,
    [ChannelType.VIDEO] : Video
}
const ServerChannel = ({channel,server,role}:ServerChannelProps) => {
    const { onOpen } = useModal();
    const params = useParams();
    const router = useRouter();

    const onClick = () =>{
        router.push(`/servers/${params?.serverId}/channels/${channel.id}`)
    }

    const  onAction = (e:React.MouseEvent, action: ModalType) =>{
        e.stopPropagation();
        onOpen(action , {channel,server})
    }

    const Icon = iconMap[channel.type];
  return (
    <button onClick={onClick} className={cn('group items-center  w-full px-2 py-2 rounded-md flex gap-x-2 hover:bg-zinc-700/60 dark:hover:bg-zinc-700/58 transition ' ,   params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700")}>
        <Icon className='flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400 '/>
        <span className={cn("line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition " , 
            params?.channelId === channel.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}>{channel.name}</span>
        {channel.name !== "general" && role !== MemberRole.GUEST && (
            <div className='flex items-center ml-auto gap-x-2'>
                <ActionTooltip label="Edit">
                    <Edit onClick={(e) => onAction(e,"editchannel")} className='hidden group-hover:block text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition h-4 w-4'/>
                </ActionTooltip>
                <ActionTooltip label="Delete">
                    <Trash onClick={(e) => onAction(e ,"deletechannel")}  className='hidden group-hover:block text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition h-4 w-4 '/>
                </ActionTooltip>

            </div>
        )}
        {channel.name === "general" && (
            <Lock className='h-4 w-4 ml-auto text-zinc-500 dark:text-zinc-400' />
        )}
    </button>
  )
}

export default ServerChannel