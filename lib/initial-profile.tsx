import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "./db";


export const initialProfile = async () => {
    const user = await currentUser();

    if (!user) {
        console.log("redirecting... to sign-in");
        auth().redirectToSignIn();
        return;
    }
    
    const profile = await db.profile.findUnique({
        where:{
            UserId: user.id
        }
    });
    if(profile){
        return profile
    }

    const newprofile = await db.profile.create({
        data: {
            UserId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
            
        }
    });
    return newprofile
};
