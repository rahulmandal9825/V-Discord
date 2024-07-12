"use client";

import { useEffect, useState } from "react";
import CreateserverModel from "../model/create-server-model";
import InviteModel from "../model/Invite-model";
import EditserverModel from "../model/edit-server-model";
import ManagememberModel from "../model/manage-member";


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
        </>
    )
}