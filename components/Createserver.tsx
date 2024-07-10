"use client";
import React from 'react'
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
import FlieUplaod from './FlieUplaod';
import { useRouter } from 'next/navigation';
 

const formSchema = z.object({
  name: z.string().min(1, {
    message: " Server name is required"
  }),
  imageUrl: z.string().min(1 , {
     message: "server image is  required"
  })
})
  

const Createserver = () => {

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          imageUrl: ""
        },
      })
     
      const isLoading = form.formState.isSubmitting;
      // 2. Define a submit handler.
      const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {

        await axios.post("/api/servers" , values);

        form.reset();
        router.refresh();
        window.location.reload();        
      } catch (error) {
        console.log(error);
      }
      }

  return (
    <Dialog open>
  <DialogContent className='bg-white text-black p-0'>
    <DialogHeader className='pt-8 px-6'>
      <DialogTitle className='text-2xl text-center font-bold'>Customise your server</DialogTitle>
      <DialogDescription className='text-center text-zinc-500'>
        Give your server a personality with a name and an image. You can always chnage it later.
      </DialogDescription>
    </DialogHeader>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className='px-6 space-y-8'>
            <div className='flex items-center justify-center text-center'>
                <FormField
                control={form.control}
                name='imageUrl'
                render={({field}) => (
                    <FormItem>
                        <FormControl>
                        <FlieUplaod
                        endpoint="serverImage"
                        value={field.value}
                        onChange={field.onChange}
                        />
                        </FormControl>
                    </FormItem>
                )}
                />
            </div>
                <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=' upercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>Server name</FormLabel>
              <FormControl>
                <Input 
                disabled={isLoading} 
                className='bg-zinc-300/30 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                placeholder="Enter Server name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        </div>
        <DialogFooter className=' px-6 py-4'>
                <Button variant="primary" disabled={isLoading} className=' font-semibold text-sm p-1 bg-blue-600 text-white' >Create</Button>
        </DialogFooter>
        
      </form>
    </Form>
  </DialogContent>
</Dialog>

  )
}

export default Createserver
