import { Member, Profile, Server } from "@prisma/client";
import { Server as NetServer , Socket } from "net";
import { Server as SocketIOServer } from "socket.io";
import { NextApiRequest, NextApiResponse } from "next";

export type ServerWithMembersWithProfile = Server & {
    members:(Member & {profile: Profile})[];
}

export type NextApiResponseServerIo = NextApiResponse & {
    socket:Socket & {
        server: NetServer & {
            io:SocketIOServer;
        };
    }
}
