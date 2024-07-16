import { currentProfile } from '@/components/current-profile';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

interface ServerIdPageProps {
  params:{
    serverId: string;
  }
};

const SeverIdpage = async({params}: ServerIdPageProps) => {

  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where:{
      id:params.serverId,
      members:{
        some:{
          profileId: profile.id,
        }
      }
    },
    include:{
      Channels:{
        where:{
          name:"general"
        },
        orderBy:{
          createdAT: "asc"
        }
      }
    }
  })


  const initialChannel =server?.Channels[0];

  if(initialChannel?.name !== "general"){
    return null
  }


  return redirect(`/servers/${params.serverId}/channels/${initialChannel.id}`);
}

export default SeverIdpage