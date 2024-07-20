"use client";
import {UploadDropzone} from "@/lib/uploadthing";
import {FileIcon, X} from "lucide-react";
import Image from "next/image";
import React from "react";
import {useToast} from "./ui/use-toast";

interface FlieUplaodProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "messageFile" | "serverImage";
}

const FlieUplaod = ({onChange, value, endpoint}: FlieUplaodProps) => {
    const {toast} = useToast();

    const fileType = value?.split(".").pop();
    if (value && fileType !== "pdf") {
        return (
            <div className="relative h-[120px] w-[120px] ">
                <Image
                    width={300}
                    height={300}
                    src={value}
                    alt="upload"
                    className=" aspect-square object-cover  rounded-md"
                />
                <button
                    onClick={() => onChange("")}
                    className="bg-rose-500 text-white right-0 p-1 rounded-full absolute top-0 shadow-sm"
                    type="button"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }
    if (value && fileType=== "pdf") {
        return(
            <div className=" flex flex-col items-center gap-4">
                <FileIcon className="h-20 w-20"/>
                <a href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-xm text-indigo-500 dark:text-indigo-400 hover:underline"
                >
                {value}
                </a>
                <button
                    onClick={() => onChange("")}
                    className="bg-rose-500 text-white right-10  bottom-15 p-2 rounded-full absolute shadow-sm"
                    type="button"
                >
                    <X className="h-6 w-6" />
                </button>
            </div>
        )
    }
    return (
        <UploadDropzone
            className=" cursor-pointer border-none text-blue-400 flex gap-2 h-[200px] ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
                toast({
                    title: "Upload Completed",
                    variant: "primary",
                });
            }}
            onUploadError={(error: Error) => {
                // Do something with the error.
                toast({
                    title: "Upload Completed",
                    variant: "destructive",
                });
            }}
        />
    );
};

export default FlieUplaod;
