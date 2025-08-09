import { getUserSession } from "@/actions/auth";
import Agent from "@/components/Agent";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const session = await getUserSession();

  if (!session) {
    redirect("/");
  }

  const userData = {
    userName:
      session.user?.identities?.[0]?.identity_data?.full_name ?? "کاربر",
    userId: session.user.id,
  };
  return (
    <>
      <Agent
        userName={userData.userName}
        userId={userData.userId}
        type="generate"
      />
    </>
  );
}

export default page;
