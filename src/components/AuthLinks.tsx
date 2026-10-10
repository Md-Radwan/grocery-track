"use client";

import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";

const AuthLinks = () => {
  const { data: session } = useSession();
  console.log("user session in navbar", session);
  return (
    <>
      {session?.user ? (
        <>
            <span>Welcome, {session.user?.name}</span>
            
            <button onClick={() => signOut()} className="btn py-2.5 px-4.5 rounded-lg bg-[#05893E] text-white text-sm font-semibold leading-5">
              সাইন আউট
            </button>
        </>
      ) : (
        <>
          <Link className="text-sm font-semibold leading-5" href={"/sign-in"}>
            সাইন ইন
          </Link>
          <Link href={"/sign-up"}>
            <button className="btn py-2.5 px-4.5 rounded-lg bg-[#05893E] text-white text-sm font-semibold leading-5">
              সাইন আপ
            </button>
          </Link>
        </>
      )}
    </>
  );
};

export default AuthLinks;
