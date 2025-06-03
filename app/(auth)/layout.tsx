import { getUserSession } from "@/actions/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

async function Authlayout({ children }: { children: ReactNode }) {
  const respons = await getUserSession();
  if (respons?.user) {
    redirect("/");
  }
  return <div className="auth-layout">{children}</div>;
}

export default Authlayout;
