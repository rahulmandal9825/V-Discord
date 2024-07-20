"use client";

import React from "react";
import {z} from "zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {Plus, Smile} from "lucide-react";
import qs from "query-string"
import axios from "axios";
import { useModal } from "@/hooks/use-model-store";
import EmojiPicker from "./emoji-picker";


interface ChatInputProps {
    apiUrl: string;
    query: Record<string, any>;
    name: string;
    type: "conversation" | "channel";
}

const formSchema = z.object({
    content: z.string().min(1),
});

const ChatInput = ({apiUrl, query, name, type}: ChatInputProps) => {
    const {onOpen} =useModal()


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl,
                query,
            })
            await axios.post(url,values);
            form.reset();


        } catch (error) {
            console.log(error);
        }
    };
    const hanndleclose = () => {
        form.reset();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <div className="">
                    <FormField
                        control={form.control}
                        name="content"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <div className=" relative p-4 pb-6">
                                        <button
                                        onClick={()=> onOpen("messageFile", {apiUrl , query})}
                                            type="button"
                                            className="absolute top-7 left-8 h-[26px] w-[26px] bg-zinc-500 dark:text-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center "
                                        >
                                            <Plus className="text-white dark:text-zinc-700" />
                                        </button>
                                        <Input
                                            disabled={isLoading}
                                            className=" bg-zinc-400 p-6 pl-12 dark:bg-[#333b4b]  dark:text-white  border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                            placeholder={`Message for ${type=== "conversation" ? name : "#" + name}`}
                                            {...field}
                                        />
                                        <div className="absolute top-7 right-7">
                                        <EmojiPicker onChange={(emoji:string) => field.onChange(`${field.value} ${emoji}`)}
                                        />
                                        </div>
             
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </form>
        </Form>
    );
};

export default ChatInput;
