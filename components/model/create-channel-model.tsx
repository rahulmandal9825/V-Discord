"use client";
import React from "react";
import axios from "axios";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

import {Input} from "@/components/ui/input";
import qs from "query-string"
import {useParams, useRouter} from "next/navigation";
import {useModal} from "@/hooks/use-model-store";
import {useToast} from "../ui/use-toast";
import { ChannelType } from "@prisma/client";

const formSchema = z.object({
    name: z.string().min(1, {
        message: " Channel name is required",
    }).refine(
        name => name !== "general",
        {
            message: "Channel name cannot be general"
        }
    ),
    type: z.nativeEnum(ChannelType)
});

const CreatchannelModel = () => {
    const {isOpen, onClose, type} = useModal();
    const router = useRouter();
    const {toast} = useToast();
    const params =useParams();

    const isModelOpen = isOpen && type == "CreateChannel";

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type:ChannelType.TEXT,
        },
    });

    const isLoading = form.formState.isSubmitting;
    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url:"/api/channels",
                query:{
                    serverId: params?.serverId
                }
            });
            await axios.post(url,values);
            form.reset();
            router.refresh();
            onClose();


        } catch (error) {
            console.log(error);
        }
    };

    const hanndleclose = () => {
        form.reset();
        onClose();
    };

    return (
        <Dialog open={isModelOpen} onOpenChange={hanndleclose}>
            <DialogContent className="dark:bg-zinc-800 bg-white dark:text-white text-white p-0">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">Create Channel</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="px-6 space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className=" upercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Channel name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-[#333b4b] dark:text-white  border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Enter Channel name"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField control={form.control}
                            name="type"
                            render={({field}) => (
                                  <FormItem>
                                    <FormLabel>Channel Type</FormLabel>
                                    <Select
                                    disabled={isLoading}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    >
                                    <FormControl>
                                        <SelectTrigger className="bg-[#333b4b] border-0 focus:ring-0 text-white ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                                        <SelectValue placeholder="Select a channel type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.values(ChannelType).map((type)=>(
                                            <SelectItem
                                            key={type}
                                            value={type}
                                            className="capitalize"
                                            >
                                            {type.toLowerCase()}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                  </FormItem>      
                            )}
                            />

                        </div>
                        <DialogFooter className=" px-6 py-4">
                            <Button
                                variant="primary"
                                disabled={isLoading}
                                className=" font-semibold text-sm p-1 bg-blue-600 text-white"
                            >
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CreatchannelModel;
