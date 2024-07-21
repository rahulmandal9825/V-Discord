import { currentProfile } from "@/components/current-profile"
import { db } from "@/lib/db";
import { DirectMessage, Message } from "@prisma/client";
import { NextResponse } from "next/server"

const Messages_BATCH = 10;

export async function GET( req: Request){
    try {
        const profile = await currentProfile();
        const{ searchParams } = new URL(req.url);

        const cursor = searchParams.get("cursor");
        const conversationId = searchParams.get("conversationId");
        if (!profile) {
        return new NextResponse("Uanuthorized ", { status: 401})
        }
        if (!conversationId) {
            return new NextResponse("conversationId is missing  ", { status: 400})
            }


            let messages: DirectMessage[] =[]

            if(cursor){
                messages =await db.directMessage.findMany({
                    take:Messages_BATCH,
                    skip:1,
                    cursor:{
                        id:cursor,
                    },
                    where:{
                       conversationId ,
                    },
                    include:{
                        member:{
                            include:{
                                profile: true,
                            }
                        }
                    },
                    orderBy:{
                        createdAT:"desc",
                    }
                });
            } else {
                messages =await db.directMessage.findMany({
                    take:Messages_BATCH,
                    where:{
                        conversationId,
                    },
                    include:{
                        member:{
                            include:{
                                profile: true,
                            }
                        }
                    },
                    orderBy:{
                        createdAT:"desc",
                    }
                });
            }

            let nextCursor = null;
            if (messages.length === Messages_BATCH) {
                nextCursor = messages[Messages_BATCH -1].id
            }
            return NextResponse.json({
                items: messages,
                nextCursor
            })
    } catch (error) {
        console.log(error)
        return new NextResponse("Direct messages Internal Error ", { status: 500})
    }
}