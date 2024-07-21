"use client";
import React, {useState} from "react";
import axios from "axios";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import qs from "query-string";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import {useModal} from "@/hooks/use-model-store";
import {Check, Gavel, Loader2, MoreVertical, Shield, ShieldAlert, ShieldCheck, ShieldQuestion} from "lucide-react";
import {ServerWithMembersWithProfile} from "@/type/Type";
import {ScrollArea} from "../ui/scroll-area";
import Image from "next/image";
import { DropdownMenuPortal } from "@radix-ui/react-dropdown-menu";
import { MemberRole } from "@prisma/client";
import { useRouter } from "next/navigation";

const ManagememberModel = () => {
    const {isOpen, onOpen, onClose, type, data} = useModal();
    const isModelOpen = isOpen && type == "members";
    const {server} = data as {server: ServerWithMembersWithProfile};
    const [LoadingId, setLoadingId] = useState("");

    const router = useRouter();
    const roleIconMap = {
        GUEST: null,
        MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
        ADMIN: <ShieldAlert className="h-4 w-4 text-rose-500" />,
    };


    const Kick = async(memberId:string) => {
        try {
            setLoadingId(memberId);
            const url =qs.stringifyUrl({
                url:`/api/members/${memberId}`,
                query:{
                    serverId:server?.id,
                }
            });
            const response =await axios.delete(url);
            router.refresh();
            onOpen("members" , {server: response.data});
            setLoadingId("")
        } catch (error) {
            setLoadingId("")
            console.log(error);
        }
    }

    const onRoleChange = async(memberId:string, role:MemberRole) => {
        try {
            setLoadingId(memberId)
            const url = qs.stringifyUrl({
                url:`/api/members/${memberId}`,
                query:{
                    serverId: server?.id,
                }
            });
            const response = await axios.patch(url , {role});
            router.refresh();
            onOpen("members" , {server: response.data});
            setLoadingId("")

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog open={isModelOpen} onOpenChange={onClose}>
            <DialogContent className="dark:bg-zinc-800 bg-white dark:text-white text-black p-0">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">Manage members</DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        {server?.members?.length} Members
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="mt-8 max-h-[420px] pr-6">
                    {server?.members?.map((member) => (
                        <div key={member.id} className="flex items-center gap-x-2 mb-5 px-5">
                            <Image
                                src={member?.profile?.imageUrl}
                                width={35}
                                height={35}
                                alt="memeber image"
                                className=" rounded-full mr-1"
                            />
                            <div className="flex flex-col ">
                                <div className="flex gap-2 items-center">
                                    <h1>{member.profile.name}</h1>
                                    {roleIconMap[member.role]}
                                </div>
                                <h1 className="text-sm text-zinc-500">{member.profile.email}</h1>
                            </div>
                            {member.role !== "ADMIN" && LoadingId !== member.id && (
                                <div className="ml-auto ">
                                   <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical className="h-5 w-5 text-zinc-700"/>
                                    </DropdownMenuTrigger>
                                <DropdownMenuContent side="right">
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            <ShieldQuestion className="w-4h-4 mr-2"/>
                                            <span>Role</span>
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <DropdownMenuItem onClick={()=>onRoleChange(member.id ,"GUEST")}>
                                                    <Shield className="h-4 w-4 mr-2"/>
                                                    Guest {member.role == "GUEST" && (
                                                        <Check className="h-4 w-4 ml-auto"/>
                                                    )}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={()=>onRoleChange(member.id ,"MODERATOR")}>
                                                    <Shield className="h-4 w-4 mr-2"/>
                                                    Moderator {member.role == "MODERATOR" && (
                                                        <ShieldCheck className="h-4 w-4 ml-auto"/>
                                                    )}
                                                </DropdownMenuItem>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                 <DropdownMenuSeparator/>
                                 <DropdownMenuItem onClick={() =>Kick(member.id)}>
                                    <Gavel className="h-4 w-4 mr-2"/>
                                    Kick
                                 </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu> 
                                </div>
                                
                              
                            )}
                            {LoadingId === member.id && (
                                <Loader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4"/>
                            )}
                            
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default ManagememberModel;
