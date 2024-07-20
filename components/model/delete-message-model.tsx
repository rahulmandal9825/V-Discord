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
import { useParams, useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-model-store';
import { useToast } from '../ui/use-toast';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Check, Copy, RefreshCcw, RefreshCw } from 'lucide-react';
import { useOrigin } from '@/hooks/use-origin';
import qs from "query-string"

const DeleteMessageModel = () => {
    const {isOpen ,onOpen , onClose ,type ,data} =useModal()
    const isModelOpen = isOpen && type == "deleteMessage";
    const {apiUrl , query} = data;
    const params = useParams()
    const [isLoading, setisLoading] = useState(false);

    const  router = useRouter();

      const handleleave = async () => {
        try {
          setisLoading(true);
          const url = qs.stringifyUrl({
              url: apiUrl || "",
              query: query,
          });
  
          await axios.delete(url);
          onClose();

          } catch (error) { 
            console.log(error);
          } finally{
            setisLoading(false);
          }
      }



  return (
    <Dialog open={isModelOpen} onOpenChange={onClose} >
  <DialogContent className='dark:bg-zinc-800 bg-white dark:text-white text-black p-0'>
    <DialogHeader className='pt-8 px-6'>
      <DialogTitle className='text-2xl text-center font-bold'>Delete Message</DialogTitle>
    </DialogHeader>
    <DialogDescription className='text-center text-md'>
      Are you sure you want to Delete Message <br/>
      it will permanently deleted    
    </DialogDescription>
    <DialogFooter>
      <div className='flex justify-evenly w-full py-5'>
        <Button onClick={onClose} disabled={isLoading} className=' hover:bg-rose-500 hover:text-white transition-all' >
          Cancel
        </Button>
        <Button onClick={handleleave} disabled={isLoading}  className='bg-blue-500 text-white hover:bg-rose-500 transition-all' >
          Confirm
        </Button>
      </div>
    </DialogFooter>
  </DialogContent>
</Dialog>

  )
}

export default DeleteMessageModel
