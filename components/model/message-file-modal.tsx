"use client";
import React from 'react'
import qs from "query-string"
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
  import { z } from "zod"
  import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import FlieUplaod from '../FlieUplaod';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-model-store';
import { useToast } from '../ui/use-toast';
 

const formSchema = z.object({
  fileUrl: z.string().min(1 , {
     message: " fileUrl is  required"
  })
})
  

const MessageFileModel = () => {
    const {isOpen , onClose ,type , data} =useModal()
    const router = useRouter();
    const {toast} = useToast();
    const{apiUrl , query} = data;
    
   
    const isModelOpen = isOpen && type == "messageFile";
 

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          fileUrl: ""
        },
      });
     
      const isLoading = form.formState.isSubmitting;
      // 2. Define a submit handler.
      const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
      
        const url = qs.stringifyUrl({
          url: apiUrl || "",
          query,
        });
         
        await axios.post(url, {
          ...values,
          content: values.fileUrl
        })

        form.reset();
        router.refresh();
        hanndleclose()
    
      } catch (error) {
        toast({
          title: "failed to created",
          variant: "destructive",
      });
        console.log(error);
      }
      }
      const hanndleclose = ()=>{
        form.reset();
        onClose();
      }

  return (
    <Dialog open={isModelOpen} onOpenChange={hanndleclose}>
  <DialogContent className='dark:bg-zinc-800 bg-white dark:text-white text-black p-0'>
    <DialogHeader className='pt-8 px-6'>
      <DialogTitle className='text-2xl text-black dark:text-white text-center font-bold'>Add a attachment</DialogTitle>
      <DialogDescription className='text-center text-zinc-500'>
        Send a file as a message
      </DialogDescription>
    </DialogHeader>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className='px-6 space-y-8'>
            <div className='flex items-center justify-center text-center'>
                <FormField
                control={form.control}
                name='fileUrl'
                render={({field}) => (
                    <FormItem>
                        <FormControl>
                        <FlieUplaod
                        endpoint="messageFile"
                        value={field.value}
                        onChange={field.onChange}
                        />
                        </FormControl>
                    </FormItem>
                )}
                />
            </div>
            </div>
            <DialogFooter className=' px-6 py-4'>
                <Button variant="primary" disabled={isLoading} className=' font-semibold text-sm p-1 bg-blue-600 text-white' >Send</Button>
        </DialogFooter>
      </form>
    </Form>
  </DialogContent>
</Dialog>

  )
}

export default MessageFileModel
