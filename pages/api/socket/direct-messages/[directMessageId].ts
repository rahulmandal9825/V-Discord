import { currentProfilePage } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/type/Type";
import { MemberRole } from "@prisma/client";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res:NextApiResponseServerIo){
    if (req.method !== "DELETE" && req.method !=="PATCH") {
        return res.status(405).json({error: "method not allowed"})
    }
    try {
        const profile = await currentProfilePage(req);
        const { content} = req.body;
        const { directMessageId, conversationId } = req.query;


        if (!profile) {
           return res.status(401).json({error: " unauthorized"})
        }
        if(!conversationId){
            return res.status(400).json({error: " conversationId is missing"})
        }
      
       

    const conversation = await db.conversation.findFirst({
        where:{
            id: conversationId as string,
            OR:[
                {
                    memberOne:{
                        profileId: profile.id,
                    }
                },
                {
                    memberTwo: {
                        profileId: profile.id
                    }
                }
            ]
        },
        include:{
            memberOne:{
                include:{
                    profile: true,
                }
            },
            memberTwo:{
                include:{
                    profile: true,
                }
            }

        }
    }) 

        
        if (!conversation) {
            return res.status(404).json({message: " conversation not found"})
        }

        const member = conversation.memberOne.profileId === profile.id ? conversation.memberOne : conversation.memberTwo;

        if(!member){
            return res.status(404).json({message: " member not found"})
        }
        let directmessage = await db.directMessage.findFirst({
           where:{
            id: directMessageId as string,
            conversationId: conversationId as string,
           },
           include:{
            member:{
                include:{
                    profile:true,
                }
            }
           }
        });
        if(!directmessage || directmessage.deleted){
            return res.status(404).json({message: " Message not found"})
        }
        
        const isMessageOwner = directmessage.memberId === member.id;
        const isAdmin = member.role === MemberRole.ADMIN;
        const isModerator = member.role === MemberRole.MODERATOR;
        const canModify  = isMessageOwner || isAdmin || isModerator;

        if (!canModify) {
            return res.status(404).json({message: "unauthorized"});

        }

        if(req.method === "DELETE"){
            directmessage = await db.directMessage.update({
                    where:{
                        id:directMessageId as string,
                    },
                    data:{
                        fileUrl: null,
                        content: 'This message has benn deleted ',
                        deleted: true,
                    },
                    include:{
                        member:{
                            include:{
                                profile:true,
                            }
                        }
                    }
            });
        }
        if(req.method === "PATCH"){
            if (!isMessageOwner) {
                return res.status(404).json({message: "unauthorized"});
            }
            directmessage = await db.directMessage.update({
                    where:{
                        id:directMessageId as string,
                    },
                    data:{
                        content,
                    },
                    include:{
                        member:{
                            include:{
                                profile:true,
                            }
                        }
                    }
            });
        }


        const updateKey = `chat:${conversationId}:messages:update`

        res?.socket?.server?.io?.emit(updateKey , directmessage);
     
        return res.status(200).json(directmessage);
    } catch (error) {
        console.log("[Direct_MESSAHES_POST]", error);
        return res.status(500).json({message: "internal Error"})
    }
}