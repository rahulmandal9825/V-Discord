import { currentProfile } from "@/components/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";


export async function DELETE(req:Request,{params}:{params:{memberId:string}}){
    try {
        const profile = await currentProfile();
        const {searchParams} = new URL(req.url);


        const serverId = searchParams.get("serverId");

        if (!profile) {
            return new NextResponse("unauthorized" ,{status: 401});
        }
        if(!serverId){
            return new NextResponse("Server ID Missing" , {status: 500 });
        }
        if(!params.memberId){
            return new NextResponse("Server ID Missing" , {status: 500 });
        }

        const server = await db.server.update({
            where:{
                id:serverId,
                profileId: profile.id,
            },
            data:{
                members:{
                    deleteMany:{
                        id:params.memberId,
                        profileId:{
                            not: profile.id
                        }
                    }
                }
            },
            include:{
                members:{
                    include:{
                        profile:true,
                    },
                    orderBy:{
                        role: "asc",
                    }
                }
            }
        });

        console.log(server);
        return NextResponse.json(server);

    } catch (error) {
        console.log(error);
    }
}
export async function PATCH(req:Request ,{params}:{params:{memberId:string}} ) {
 
    try {
        const profile = await currentProfile();
        const {searchParams} = new URL(req.url);
        const {role} = await req.json();

        const serverId = searchParams.get("serverId");

        if (!profile) {
            return new NextResponse("unauthorized" ,{status: 401});
        }
        if(!serverId){
            return new NextResponse("Server ID Missing" , {status: 500 });
        }
        if(!params.memberId){
            return new NextResponse("Server ID Missing" , {status: 500 });
        }

        const server = await db.server.update({
            where:{
                id: serverId,
                profileId:profile.id,
            },
            data:{
                members:{
                    update:{
                        where:{
                            id:params.memberId,
                            profileId:{
                                not: profile.id
                            }
                        },
                        data:{
                            role
                        }
                    }
                }
            },
            include:{
                members:{
                    include:{
                        profile:true,
                    },
                    orderBy:{
                        role:"asc"
                    }
                }
            }
        });
         return NextResponse.json(server);

    } catch (error) {
        console.log(error);
    }

}