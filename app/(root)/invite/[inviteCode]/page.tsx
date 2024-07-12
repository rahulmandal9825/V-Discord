import { currentProfile } from '@/components/current-profile';
import { db } from '@/lib/db';
import { RedirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

interface InvitecodePageProps {
    params:{
        inviteCode:string;
    }
}
const Invitecode = async ({params}:InvitecodePageProps) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirect('/');
        
    }
    if (!params.inviteCode) {
        redirect("/");     
    }

    const existingserver = await db.server.findFirst({
        where:{
            inviteCode:params.inviteCode,
            members:{
                some:{
                    profileId:profile.id
                }
            }

        }
    })
    if (existingserver) {
      return  redirect(`/servers/${existingserver.id}`)
    }

    const server = await db.server.update({
        where:{
            inviteCode:params.inviteCode,
        },
        data:{
            members: {
                create:[
                    {
                        profileId: profile.id,

                    }
                ]
            }
        }
    });

    if (server) {
        return redirect(`/servers/${server.id}`)
        
    }

  return null;
}

export default Invitecode