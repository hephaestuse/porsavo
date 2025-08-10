import { getUserSession, signOut } from "@/actions/auth";
import SignOutbtn from "@/components/SignOutBtn";
import BackBtn from "@/components/ui/backBtn";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

async function Rootlayout({ children }: { children: ReactNode }) {
  const respons = await getUserSession();
 
  return (
    <div className="root-layout">
      <nav className="flex">
        <BackBtn />
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={38} height={32} />
          <h2 className="text-primary-100">Porsavo</h2>
        </Link>
        {respons?.user ? (
          <SignOutbtn />
        ) : (
          <Link className="ms-auto " href={"/sign-in"}>
            <Button className="btn-primary max-sm:w-full capitalize">
              log in
            </Button>
          </Link>
        )}
      </nav>
      {children}
    </div>
  );
}

export default Rootlayout;
