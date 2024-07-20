"use client";

import { useEffect, useState } from "react";
import CreateserverModel from "@/components/model/create-server-model";
import InviteModel from "@/components/model/Invite-model";
import EditserverModel from "@/components/model/edit-server-model";
import ManagememberModel from "@/components/model/manage-member";
import CreatchannelModel from "@/components/model/create-channel-model";
import LeaveserverModel from "@/components/model/leave-server-model";
import DeleteserverModel from "@/components/model/delete-server-model";
import DeleteChannelModel from "@/components/model/delete-channel-model";
import EditchannelModel from "@/components/model/edit-channel-model";
import MessageFileModel from "@/components/model/message-file-modal";
import DeleteMessageModel from "@/components/model/delete-message-model";



export const ModelProvider = () =>{
    const [isMounted, setisMounted] = useState(false);

    useEffect(() => {
    setisMounted(true);
    }, []);

    if(!isMounted){
        return null;
    }

    return (
        <>
        <CreateserverModel/>
        <InviteModel/>
        <EditserverModel/>
        <ManagememberModel/>
        <CreatchannelModel/>
        <LeaveserverModel/>
        <DeleteserverModel/>
        <DeleteChannelModel/>
        <EditchannelModel/>
        <MessageFileModel/>
        <DeleteMessageModel/>

        </>
    )
}