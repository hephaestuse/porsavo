import React, { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Github } from "lucide-react";
import { OAuthSignIn } from "@/actions/auth";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { SignInWithOAuthCredentials } from "@supabase/supabase-js";
type OAthLoginBtnProps = {
  provider: SignInWithOAuthCredentials["provider"];
};
function OAthLoginBtn({ provider }: OAthLoginBtnProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  function handleGithubLogin() {
    setIsLoading(true);
    startTransition(async () => {
      const { data, error } = await OAuthSignIn({
        provider: provider,
      });
      if (error) {
        redirect("/error");
      } else {
        toast.success("با موفقیت وارد شدید");
        redirect(data?.url!);
      }
    });
    setIsLoading(false);
  }
  return (
    <Button
      disabled={isLoading}
      type="button"
      className="btn"
      onClick={handleGithubLogin}
    >
      <Github />
      {isLoading ? "GitHub..." : "GitHub"}
    </Button>
  );
}

export default OAthLoginBtn;
