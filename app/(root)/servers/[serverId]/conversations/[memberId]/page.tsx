import ChatHeader from '@/components/ChatHeader';
import { currentProfile } from '@/components/current-profile';
import { FindOrCreateConversation } from '@/lib/conversation';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

interface conversationprops {
  params:{
    serverId: string;
    memberId: string;
  }
}

const Conservation = async ({params}: conversationprops) => {

  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const currentmember = await db.member.findFirst({
    where:{
      serverId: params.serverId,
      profileId: profile.id,
    },
    include:{
      profile:true,
    }
  });


  if (!currentmember) {
    return redirect("/");
    
  }

  const conversation = await FindOrCreateConversation(currentmember?.id , params.memberId);


  if (!conversation) {
    return redirect(`/servers/${params.serverId}`);
    
  }

  const { memberOne , memberTwo} = conversation;

  const othermember = memberOne.profileId === profile.id ? memberTwo : memberOne; 
  console.log(currentmember ,othermember);


  return (
    <div className='bg-white dark:bg-[#313338] flex flex-col h-full'>
      <ChatHeader
      imageUrl={othermember.profile.imageUrl}
      name={othermember.profile.name}
      serverId={params.serverId}
      type='conversation'

      />
    </div>
  )
}

export default Conservation