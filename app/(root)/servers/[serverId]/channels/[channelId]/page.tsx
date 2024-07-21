import ChatHeader from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/chat/ChatMessages";
import {currentProfile} from "@/components/current-profile";
import {MediaRoom} from "@/components/media-room";
import {db} from "@/lib/db";
import {redirectToSignIn} from "@clerk/nextjs/server";
import {ChannelType} from "@prisma/client";
import {redirect} from "next/navigation";
import React from "react";

interface ServerIdPageProps {
    params: {
        serverId: string;
        channelId: string;
    };
}

const ChannelChat = async ({params}: ServerIdPageProps) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    const channel = await db.channel.findUnique({
        where: {
            id: params.channelId,
        },
    });

    const member = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id,
        },
    });
    if (!channel || !member) {
        redirect("/");
    }

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full ">
            <ChatHeader name={channel.name} serverId={channel.serverId} type="channel" />
            {channel.type === ChannelType.TEXT && (
                <>
                    <ChatMessages
                        member={member}
                        chatId={channel.id}
                        name={channel.name}
                        type="channel"
                        apiUrl="/api/messages"
                        socketUrl="/api/socket/messages"
                        socketQuery={{
                            channelId: channel.id,
                            serverId: channel.serverId,
                        }}
                        paramKey="channelId"
                        paramValue={channel.id}
                    />
                    <ChatInput
                        name={channel.name}
                        type="channel"
                        apiUrl="/api/socket/messages"
                        query={{
                            channelId: channel.id,
                            serverId: channel.serverId,
                        }}
                    />
                </>
            )}
            {channel.type === ChannelType.AUDIO && <MediaRoom chatId={channel.id} video={false} audio={true} />}
            {channel.type === ChannelType.VIDEO && <MediaRoom chatId={channel.id} video={true} audio={true} />}
        </div>
    );
};

export default ChannelChat;
