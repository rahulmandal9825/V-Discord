import React from 'react'
import { currentProfile } from './current-profile';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { ChannelType } from '@prisma/client';
import ServerHeader from './ServerHeader';



interface ServerSidbarprops {
    serverId: string;
}

const ServerSidebar = async ({serverId}: ServerSidbarprops) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirect("/");
        
    }

    const server =await db.server.findUnique({
        where:{
            id:serverId,
        },
        include:{
            Channels:{
                orderBy:{
                    createdAT:"asc"
                }
            },
            members:{
                orderBy:{
                    role:"asc"
                }
            }
        }
    });
    const TextChannels =server?.Channels.filter((channel)=> channel.type === ChannelType.TEXT);
    const AudioChannels =server?.Channels.filter((channel) => channel.type === ChannelType.AUDIO);
    const VideoChannels =server?.Channels.filter((channel) => channel.type === ChannelType.VIDEO);
    const members = server?.members.filter((member)=> member.profileId !== profile.id);
   
    if (!server) {
    return redirect("/");
    }

    const role = server.members.find((member) => member.profileId === profile.id)?.role;
    return(
        <div className='flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]'>
            <ServerHeader
            server={server}
            role={role}
            />
        </div>
    )
}

export default ServerSidebar