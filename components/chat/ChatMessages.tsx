"use client";
import {Member, Message, Profile} from "@prisma/client";
import React, {Fragment} from "react";
import ChatWelcome from "./ChatWelcome";
import UseChatQuery from "@/hooks/use-chat-query";
import {Loader2, ServerCrash} from "lucide-react";
import Chatitem from "./chat-item";
import { format } from "date-fns";

const DATE_FORMAT = "d MMM yyyy, HH:mm"

type MessagewithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile;
    };
};
interface ChatMessagesprops {
    name: string;
    member: Member;
    chatId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramKey: "channelId" | "conversationId";
    paramValue: string;
    type: "channel" | "conversation";
}
const ChatMessages = ({
    name,
    member,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
    type,
}: ChatMessagesprops) => {
    const queryKey = `chat:${chatId}`;
    const {data, fetchNextPage, hasNextPage, isFetchingNextPage, status} = UseChatQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue,
    });

    if (status === "pending") {
        return (
            <div className="flex flex-col  flex-1 justify-center items-center">
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
                <p className="text-sm text-zinc-500 dark:text-zinc-300">Loading message...</p>
            </div>
        );
    }
    if (status === "error") {
        return (
            <div className="flex flex-col  flex-1 justify-center  items-center">
                <ServerCrash className="h-7 w-7 text-zinc-500  my-4" />
                <p className="text-sm text-zinc-500 dark:text-zinc-300">Something went wrong!</p>
            </div>
        );
    }

    return (
        <div className=" flex flex-col flex-1 py-4 overflow-y-auto ">
            <div className="flex-1 ">
                <ChatWelcome type={type} name={name} />

                <div className="flex flex-col-reverse mt-auto">
                    {data?.pages?.map((group, i) => (
                        <Fragment key={i}>
                            {group.items.map((message: MessagewithMemberWithProfile) => (
                               <Chatitem
                               currentMember={member}
                               key={message.id}
                               id={message.id}
                               member={message.member}
                               content={message.content}
                               fileUrl={message.fileUrl}
                               deleted={message.deleted}
                               timestamp={format(new Date(message.createdAT), DATE_FORMAT)}
                               isUpdated={message.updateAt !== message.createdAT}
                               socketUrl={socketUrl}
                               socketQuery={socketQuery}

                               />
                            ))}
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChatMessages;
