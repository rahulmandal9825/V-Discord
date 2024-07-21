"use client";
import {Member, Message, Profile} from "@prisma/client";
import React, {ElementRef, Fragment, useRef} from "react";
import ChatWelcome from "./ChatWelcome";
import UseChatQuery from "@/hooks/use-chat-query";
import {Loader2, ServerCrash} from "lucide-react";
import Chatitem from "./chat-item";
import { format } from "date-fns";
import { useChatSocket} from "@/hooks/use-chat-socket";
import { useChatScroll } from "@/hooks/use-chat-scroll";

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
    const addKey = `chat:${chatId}:messages`;  
    const updateKey = `chat:${chatId}:messages:update`; 

    const chatRef = useRef<ElementRef<"div">>(null);
    const bottomRef = useRef<ElementRef<"div">>(null)

    const {data, fetchNextPage, hasNextPage, isFetchingNextPage, status} = UseChatQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue,
    });
    useChatSocket({ queryKey, addKey , updateKey});
    useChatScroll({
        chatRef,
        bottomRef,
        loadMore: fetchNextPage,
        shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
        count: data?.pages?.[0]?.items?.length ?? 0,
    })


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
        <div ref={chatRef} className=" flex flex-col flex-1 py-4 overflow-y-auto ">
           {!hasNextPage &&  <div className="flex-1 " />}
              {!hasNextPage && (
                    <ChatWelcome type={type} name={name} />
              )}  
              {hasNextPage && (
                <div className="flex justify-center">
                    {isFetchingNextPage ? (
                        <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4" />
                    ):(
                        <button onClick={()=> fetchNextPage()} className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition">
                            Load previous messages
                        </button>
                    )}
                </div>
              )}

                <div className="flex flex-col-reverse mt-auto">
                    {data?.pages?.map((group, i) => (
                        <Fragment key={i}>
                            {group?.items?.map((message: MessagewithMemberWithProfile) => (
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
                                queryKey ={queryKey}
                                addKey={addKey}
                                updateKey={updateKey}

                               />
                            ))}
                        </Fragment>
                    ))}
                </div>
                <div ref={bottomRef}/>
            </div>
    );
};

export default ChatMessages;
