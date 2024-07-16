"use client";
import React, { useState } from 'react'
import axios  from "axios";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-model-store';
import { useToast } from '../ui/use-toast';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Check, Copy, RefreshCcw, RefreshCw } from 'lucide-react';
import { useOrigin } from '@/hooks/use-origin';


const InviteModel = () => {
    const {isOpen ,onOpen , onClose ,type ,data} =useModal()
    const isModelOpen = isOpen && type == "invite";
    const {server} = data;

    const origin = useOrigin() 
    const [copied, setCopied] = useState(false);
    const [isLoading, setisLoading] = useState(false);

    const inviteUrl = `${origin}/invite/${server?.inviteCode}`

    const onCopy = () =>{
            navigator.clipboard.writeText(inviteUrl);
            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 1000);
    }

    const onNewinviteUrl = async () =>{
        try {
            setisLoading(true);
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);
            console.log(response);
            onOpen("invite",{server:response.data});
                setisLoading(false);
        } catch (error) {
            setisLoading(false);
            console.log(error);
            
        }
    }


  return (
    <Dialog open={isModelOpen} onOpenChange={onClose} >
  <DialogContent className='dark:bg-zinc-800 bg-white dark:text-white text-black p-0'>
    <DialogHeader className='pt-8 px-6'>
      <DialogTitle className='text-2xl text-center font-bold'>Invite Friends</DialogTitle>
    </DialogHeader>
    <div className='p-6'>
        <Label className='uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70'>Server invite link</Label>
        <div className='flex items-center mt-2 gap-x-2'>
            <Input 
            className=' bg-zinc-200 dark:bg-[#333b4b] dark:text-white border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
            value={inviteUrl}
            />
            <Button className=' dark:bg-[#333b4b] dark:text-white' disabled={isLoading} size="icon" onClick={onCopy} >
                {copied ? <Check className='h-4 w-4 '/> : <Copy className='w-4 h-4'/>}
            </Button>
        </div>
        <div>
            <Button onClick={onNewinviteUrl} disabled={isLoading}  variant="link" size="sm" className='text-xs  text-zinc-500'>
                Generate a new link 
                <RefreshCw className='w-4 h-4 ml-2'/>
            </Button>
            
        </div>
    </div>
  </DialogContent>
</Dialog>

  )
}

export default InviteModel
