import { db } from "@/lib/db";
import { auth, getAuth } from "@clerk/nextjs/server";
import { NextApiRequest } from "next";

export const currentProfilePage = async (req: NextApiRequest) =>{
    const {userId} = getAuth(req);
    if (!userId) {
        return null;
    }
    const profile =await db.profile.findUnique({
        where:{
            UserId: userId
        }
    })
    return profile
}