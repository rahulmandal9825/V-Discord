"use client";

import { useEffect, useState } from "react";
import CreateserverModel from "../model/create-server-model";


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
        </>
    )
}