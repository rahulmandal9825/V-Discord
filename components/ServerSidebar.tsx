import React from "react";
import {currentProfile} from "./current-profile";
import {redirect} from "next/navigation";
import {db} from "@/lib/db";
import {ChannelType, MemberRole} from "@prisma/client";
import ServerHeader from "./ServerHeader";
import {ScrollArea} from "./ui/scroll-area";
import ServerSearch from "./ServerSearch";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { Separator } from "./ui/separator";
import ServerSection from "./ServerSection";
import ServerChannel from "./ServerChannel";
import Severmember from "./Severmember";

interface ServerSidbarprops {
    serverId: string;
}

const iconMap = {
    [ChannelType.TEXT] : <Hash className="mr-2 h-4 w-4"/>,
    [ChannelType.AUDIO] : <Mic className="mr-2 h-4 w-4"/>,
    [ChannelType.VIDEO] : <Video className="mr-2 h-4 w-4"/>
};

const roleiconMap = {
    [MemberRole.GUEST] : null ,
    [MemberRole.MODERATOR] : <ShieldCheck className="mr-2 h-4 w-4 text-indigo-700"/>,
    [MemberRole.ADMIN] : <ShieldAlert className="mr-2 h-4 w-4 text-rose-600"/>
};

const ServerSidebar = async ({serverId}: ServerSidbarprops) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirect("/");
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            Channels: {
                orderBy: {
                    createdAT: "asc",
                },
            },
            members: {
                include: {
                    profile: true,
                },
                orderBy: {
                    role: "asc",
                },
            },
        },
    });
    const TextChannels = server?.Channels.filter((channel) => channel.type === ChannelType.TEXT);
    const AudioChannels = server?.Channels.filter((channel) => channel.type === ChannelType.AUDIO);
    const VideoChannels = server?.Channels.filter((channel) => channel.type === ChannelType.VIDEO);
    const members = server?.members.filter((member) => member.profileId !== profile.id);
  

    if (!server) {
        return redirect("/");
    }

    const role = server.members.find((member) => member.profileId === profile.id)?.role;
    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
            <ServerHeader server={server} role={role} />
            <ScrollArea className="flex-1 px-2 mt-3">

                <ServerSearch
                data={[
                    {
                        label:"Text Channels",
                        type:"channel",
                        data: TextChannels?.map((channel)=>({
                            id: channel.id,
                            name: channel.name,
                            icon: iconMap[channel.type]
                        }))
                    },
                    {
                        label:"Voice Channels",
                        type:"channel",
                        data: AudioChannels?.map((channel)=>({
                            id: channel.id,
                            name: channel.name,
                            icon: iconMap[channel.type]
                        }))
                    },
                    {
                        label:"Video Channels",
                        type:"channel",
                        data: VideoChannels?.map((channel)=>({
                            id: channel.id,
                            name: channel.name,
                            icon: iconMap[channel.type]
                        }))
                    },
                    {
                        label:"Members",
                        type:"member",
                        data: members?.map((member)=>({
                            id: member.id,
                            name: member.profile.name,
                            icon: roleiconMap[member.role]
                        }))
                    }
                ]}
                />
                <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2"/>
                {TextChannels?.length &&  (
                    <div className="mb-2">
                        <ServerSection 
                        SectionType="channels"
                        channelType={ChannelType.TEXT}
                        role={role}
                        label="Text Channels"
                        />
                    </div>
                )}
                {TextChannels?.map((channel) =>(
                    <ServerChannel
                    key={channel.id}
                    channel={channel}
                    role={role}
                    server={server}
                    />
                ))}
                  <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2"/>
                  {AudioChannels?.length &&  (
                    <div className="mb-2">
                        <ServerSection 
                        SectionType="channels"
                        channelType={ChannelType.AUDIO}
                        role={role}
                        label="Audio Channels"
                        />
                    </div>
                )}
                {AudioChannels?.map((channel) =>(
                    <ServerChannel
                    key={channel.id}
                    channel={channel}
                    role={role}
                    server={server}
                    />
                ))}
                  <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2"/>
                  {VideoChannels?.length &&  (
                    <div className="mb-2">
                        <ServerSection 
                        SectionType="channels"
                        channelType={ChannelType.VIDEO}
                        role={role}
                        label="Video Channels"
                        />
                    </div>
                )}
                {VideoChannels?.map((channel) =>(
                    <ServerChannel
                    key={channel.id}
                    channel={channel}
                    role={role}
                    server={server}
                    />
                ))}
                   <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2"/>
                  {members?.length &&  (
                    <div className="mb-2">
                        <ServerSection 
                        SectionType="members"
                        role={role}
                        label="Member "
                        server={server}
                        />
                    </div>
                )}
     
                {members?.map((member) =>(
                    <Severmember key={member.id}
                    member={member}
                    server={server}
                    />
                ))}
            </ScrollArea>

        </div>
    );
};

export default ServerSidebar;
