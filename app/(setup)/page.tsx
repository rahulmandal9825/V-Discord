import CreateserverModel from '@/components/model/create-server-model';
import Createserver from '@/components/model/create-server-model';
import NavigationAction from '@/components/NavigationAction';
import NavigationSidebar from '@/components/NavigationSidebar';
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

    

    if(server){
       return redirect(`/servers/${server.id}`);
    }

  return (
    <div className='h-full'>
        <div className=' hidden md:flex fixed left-0 top-0 bottom-0' >
<NavigationSidebar/>
</div>
<div className='pl-0 gap-10 md:pl-40 flex flex-col justify-center  items-center h-full w-full '>
    <h1 className=' text-center text-[50px] md:text-[80px] font-extrabold text-blue-200 '>Welcome to Our DisCord Clone </h1>
    <div className='flex items-center rounded-2xl py-2 pl-2  bg-zinc-800 '>
       <h1 className='font-semibold text-lg'>Create a new srever</h1> 
       <NavigationAction/>
    </div>
</div>
    </div>



  )
  
 
}

export default Setup
