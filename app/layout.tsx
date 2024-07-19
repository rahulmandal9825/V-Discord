import type {Metadata} from "next";
import {Inter, Open_Sans} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import {cn} from "@/lib/utils";
import {ClerkProvider} from "@clerk/nextjs";
import {Toaster} from "@/components/ui/toaster";
import {ModelProvider} from "@/components/provider/model-provider";
import {SocketProvider} from "@/components/provider/socket-provider";
import { QueryProvider } from "@/components/provider/query-provider";

const font = Open_Sans({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Discord",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn(font.className, "bg-white dark:bg-[#313338]")}>
                <ClerkProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem={false}
                        storageKey="discord-theme"
                    >
                        <SocketProvider>
                            <ModelProvider />
                            <QueryProvider>
                             {children}
                            </QueryProvider>
                            <Toaster />
                        </SocketProvider>
                    </ThemeProvider>
                </ClerkProvider>
            </body>
        </html>
    );
}
