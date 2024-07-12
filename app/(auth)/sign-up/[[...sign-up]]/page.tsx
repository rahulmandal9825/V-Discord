import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return(
    <div className="glassmorphism-auth flex items-cemter justify-center h-full w-full" 
    style={{
      background: "rgba(6, 3, 3, 0.711)",
      backdropFilter: "blur(4px)",
    }}
    >
      <SignUp />
    </div>
  ) 
}