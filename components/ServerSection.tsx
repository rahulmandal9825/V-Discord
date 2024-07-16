"use client";
import { ServerWithMembersWithProfile } from '@/type/Type';
import { ChannelType, MemberRole } from '@prisma/client';
import React from 'react'
import { ActionTooltip } from './acion-tooltip';
import { Plus, Settings } from 'lucide-react';
import { useModal } from '@/hooks/use-model-store';
interface ServerSectionPops{
    label: string;
    role?:MemberRole;
    SectionType:"channels" | "members";
    channelType?: ChannelType;
    server?:ServerWithMembersWithProfile;
};



const ServerSection = ({label, role,SectionType,channelType, server}: ServerSectionPops) => {
    const {onOpen} = useModal();
  return (
    <div className='flex justify-between '>
        <p className='text-sm uppercase font-semibold text-zinc-500 dark:text-zinc-400'>{label}</p>
        {role !== MemberRole.GUEST && SectionType==="channels" && (
            <ActionTooltip label='Create Channels' side='top'>
                <button onClick={()=> onOpen("CreateChannel" , {channelType})} className='text-zinc-500 mr-2 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition'>
                    <Plus className="h-4 w-4 "/>
                </button>
            </ActionTooltip>
        )}
         {role === MemberRole.ADMIN && SectionType==="members" && (
            <ActionTooltip label='Member Setting ' side='top'>
                <button onClick={()=> onOpen("members", {server})} className='text-zinc-500 mr-2 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition'>
                    <Settings className="h-4 w-4 "/>
                </button>
            </ActionTooltip>
        )}

    </div>
  )
}

export default ServerSection