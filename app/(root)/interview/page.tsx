import { getUserSession } from "@/actions/auth";
import Agent from "@/components/Agent";
import { createClient } from "@/utils/supabase/server";
import React from "react";

async function page() {
  const session = await getUserSession();

  if (!session) {
    return <div>لطفاً وارد شوید</div>; // یا redirect یا notFound()
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
