"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Home() {
  const { signOut } = useClerk();
  const router =  useRouter();

  return (
    <main>
      <h1 className="text-indigo-600 text-2xl font-bold">Discord Form</h1>
      <ModeToggle/>
        <button className="bg-black rounded-lg p-3 font-bold">Sign in</button>
        <SignedOut>
        <div className="">
          <Button asChild className="">
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="">
          <Button className=" font-extrabold" onClick={() => signOut(() => router.push('/'))}>
            Log Out
          </Button>
        </div>
      </SignedIn>
    </main>
  );
}
