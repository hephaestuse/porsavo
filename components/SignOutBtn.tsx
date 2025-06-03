"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { signOut } from "@/actions/auth";
import { cn } from "@/app/utils";

function SignOutbtn() {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogOut = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    await signOut();
    setIsLoading(false);
  };
  return (
    <form className="mr-auto" onSubmit={handleLogOut}>
      <Button className="btn-primary max-sm:w-full" disabled={isLoading} type="submit">
        {isLoading ? "خروج..." : "خروج"}
      </Button>
    </form>
  );
}

export default SignOutbtn;
