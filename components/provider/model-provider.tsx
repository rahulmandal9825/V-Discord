"use client";

import { useEffect, useState } from "react";
import CreateserverModel from "../model/create-server-model";
import InviteModel from "../model/Invite-model";
import EditserverModel from "../model/edit-server-model";
import ManagememberModel from "../model/manage-member";
import CreatchannelModel from "../model/create-channel-model";
import LeaveserverModel from "../model/leave-server-model";
import DeleteserverModel from "../model/delete-server-model";
import DeleteChannelModel from "../model/delete-channel-model";
import EditchannelModel from "../model/edit-channel-model";



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

        </>
    )
}