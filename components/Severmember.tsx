"use client";
import { cn } from "@/lib/utils";
import {Member, MemberRole, Profile, Server} from "@prisma/client";
import {ShieldAlert, ShieldCheck} from "lucide-react";
import Image from "next/image";
import {useParams, useRouter} from "next/navigation";
import React from "react";

interface Servermemberprops {
    member: Member & {profile: Profile};
    server: Server;
}

const roleiconMap = {
    [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
    [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 ml-2  text-indigo-500" />,
    [MemberRole.GUEST]: null,
};
function Severmember({member, server}: Servermemberprops) {
    const params = useParams();
    const router = useRouter();
    const icon = roleiconMap[member.role];

    const handleclick = () => {
        router.push(`/servers/${params.serverId}/conversations/${member.id}`)
    }

    return (
        <button onClick={handleclick} className={cn('group items-center  w-full px-2 py-2 rounded-md flex gap-x-2 hover:bg-zinc-700/60 dark:hover:bg-zinc-700/58 transition ' ,   params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700")}>
            <Image
                src={member.profile.imageUrl}
                width={25}
                height={25}
                alt="memeber image"
                className=" rounded-full mr-1"
            />

            <div className="flex gap-2 items-center">
            <span className={cn("line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition " , 
            params?.memberId === member.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}>{member.profile.name}</span>
                {icon}
            </div>
        </button>
    );
}

export default Severmember;
