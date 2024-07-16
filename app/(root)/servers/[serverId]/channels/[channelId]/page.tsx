import ChatHeader from '@/components/ChatHeader';
import { currentProfile } from '@/components/current-profile';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

interface ServerIdPageProps {
  params:{
    serverId: string;
    channelId:string;
  }
};

const ChannelChat = async({params}: ServerIdPageProps) => {

  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const channel = await db.channel.findUnique({
    where:{
      id:params.channelId,
    }
  });

  const member = await db.member.findFirst({
    where:{
      serverId:params.serverId,
      profileId: profile.id,
    }
  });
  if(!channel || !member){
    redirect("/");
  }

  return (

<div className='bg-white dark:bg-[#313338] flex flex-col h-full '>

  <ChatHeader 
  name={channel.name}
  serverId={channel.serverId}
  type="channel"
  />


</div>

  )
}

export default ChannelChat