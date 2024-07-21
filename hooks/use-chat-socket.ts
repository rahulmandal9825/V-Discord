"use client";

import { useSocket } from "@/components/provider/socket-provider";
import { Member, Message, Profile } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type ChatSocketProps = {
  addKey: string;
  updateKey: string;
  queryKey: string;
};

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

export const useChatSocket = ({
  addKey,
  updateKey,
  queryKey
}: ChatSocketProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();
  console.log("use chat Socket is  working");


  useEffect(() => {
    if (!socket) {
      console.log("Socket is not working");
      return;
    }

    console.log("Socket is working");

    // Update message listener
    socket.on(updateKey, (message: MessageWithMemberWithProfile) => {
        console.log(message);
      queryClient.setQueryData([queryKey], (oldData: any) => {
        
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData;
        }

        const newData = oldData.pages.map((page: any) => ({
          ...page,
          items: page?.items?.map((item: MessageWithMemberWithProfile) =>
            item.id === message.id ? message : item
          )
        }));

        console.log("Socket is working and data is updating");
        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    // Add message listener
    socket.on(addKey, (message: MessageWithMemberWithProfile) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
      
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [{ items: [message] }]
          };
        }

        const newData = [...oldData.pages];
        newData[0] = {
          ...newData[0],
          items: [message, ...newData[0].items]
        };

        console.log("Socket is working and data is creating");
        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    return () => {
      socket.off(addKey);
      socket.off(updateKey);
      console.log("Socket listeners have been removed");
    };
  }, [addKey, updateKey, socket, queryClient, queryKey]);
};
