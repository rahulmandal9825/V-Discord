import ChatMessages from '@/components/chat/ChatMessages';
import ChatHeader from '@/components/ChatHeader';
import ChatInput from '@/components/ChatInput';
import { currentProfile } from '@/components/current-profile';
import { MediaRoom } from '@/components/media-room';
import { FindOrCreateConversation } from '@/lib/conversation';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

interface conversationprops {
  params:{
    serverId: string;
    memberId: string;
  }, searchParams:{
    video?: boolean;
  }
}

const Conservation = async ({params , searchParams}: conversationprops) => {

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



  return (
    <div className='bg-white dark:bg-[#313338] flex flex-col h-full'>
      <ChatHeader
      imageUrl={othermember.profile.imageUrl}
      name={othermember.profile.name}
      serverId={params.serverId}
      type='conversation'

      />
      {searchParams.video && (
        <MediaRoom
        chatId={conversation.id}
        video={true}
        audio={true}
        />
      )}
      {!searchParams && (
<>

      <ChatMessages
            member={currentmember}
            chatId={conversation.id}
            name={othermember.profile.name}
            type="conversation"
            apiUrl="/api/direct-messages"
            socketUrl="/api/socket/direct-messages"
            socketQuery={{
              conversationId: conversation.id,
                   }}
            paramKey="conversationId"
            paramValue={conversation.id}
            />
            <ChatInput
                name={othermember.profile.name}
                type="conversation"
                apiUrl="/api/socket/direct-messages"
                query={{
                   conversationId:conversation.id,
                }}
                />
</>

      )}

 
    </div>
  )
}

export default Conservation