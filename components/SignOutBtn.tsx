"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { signOut } from "@/actions/auth";

function SignOutbtn() {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogOut = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    await signOut();
    setIsLoading(false);
  };
  return (
    <form className="ms-auto" onSubmit={handleLogOut}>
      <Button
        className="btn-primary max-sm:w-full"
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? "Log out..." : "Log out"}
      </Button>
    </form>
  );
}

export default SignOutbtn;
