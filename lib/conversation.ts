import { db } from "./db"

 
export const FindOrCreateConversation = async(memberOneId: string , memberTwoId: string) => {

    let conversation = await FindConversations(memberOneId, memberTwoId) || await FindConversations(memberTwoId,memberOneId);

    if (!conversation) {
         conversation = await CreateConversation(memberOneId,memberTwoId);
    }

    return conversation
}

const FindConversations = async(memberOneId: string , memberTwoId: string) => {

        try {
           return await db.conversation.findFirst({
                where:{
                    AND:[
                        {memberOneId: memberOneId},
                        {memberTwoId: memberTwoId},
                    ]
                },
                include:{
                    memberOne:{
                        include:{
                            profile: true
                        }
                    },
                    memberTwo:{
                        include:{
                            profile:true
                        }
                    }
        
                }
                
            })
        } catch (error) {
            console.log(error)
            return null 
        }
        
}

const CreateConversation = async (memberOneId :string , memberTwoId: string) => {
   try {
    return await db.conversation.create({
        data:{
            memberOneId,
            memberTwoId, 
        },
        include:{
            memberOne:{
                include:{
                    profile:true
                }
            },
            memberTwo:{
                include:{
                    profile:true
                }
            }
        }
    })
   } catch (error) {
    console.log(error)
            return null 
   } 
}