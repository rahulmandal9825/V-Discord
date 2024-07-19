import {NextApiResponseServerIo } from "@/type/Type";
import { Server as NetServer} from "http";
import { NextApiRequest, NextApiResponse } from "next";
import {Server as ServerIO} from "socket.io";

export const config = {
    api:{
        bodyParser: false,
    },
}


const ioHnadler = (req: NextApiRequest, res:NextApiResponseServerIo) =>{
    if (!res.socket.server.io) {
        const path ="/api/socket/io"
        const httpServer: NetServer = res.socket.server as any ;
        const io = new ServerIO(httpServer,{
            path:path,
            addTrailingSlash:false,
        });
        res.socket.server.io = io
    }
    res.end();
}

export default ioHnadler;