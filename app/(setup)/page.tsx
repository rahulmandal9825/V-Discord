import Createserver from '@/components/Createserver';
import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile'
import { redirect } from 'next/navigation';
import React from 'react'

const Setup = async () => {
    const user = await initialProfile();

    const server = await db.server.findFirst({
        where:{
            members:{
                some:{
                    profileId: user?.id
                }
            }
        }
    });

    console.log(server);
    

    if(server){
       return redirect(`/server/${server.id}`);
    }
  return <Createserver/>
}

export default Setup
