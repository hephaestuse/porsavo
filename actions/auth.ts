"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { SignInWithOAuthCredentials } from "@supabase/supabase-js";
import { SignInParams, SignUpParams } from "@/types";
import { toast } from "sonner";

export async function signUp(params: SignUpParams) {
  const { name, email, password } = params;
  const supabase = await createClient();
  const credentials = {
    username: name as string,
    email,
    password,
  };
  const { error, data } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        username: credentials.username,
      },
    },
  });

  if (error) {
    return {
      status: error?.message,
      user: null,
    };
  } else if (data?.user?.identities?.length === 0) {
    return {
      status: "کار بر با این ایمیل قبلا ثبت شده است",
      user: null,
    };
  }
  revalidatePath("/", "layout");
  return { status: "success", user: data.user };
}

export async function signIn(params: SignInParams) {
  const { email, password } = params;
  const supabase = await createClient();
  const credentials = {
    email,
    password,
  };
  const { error, data } = await supabase.auth.signInWithPassword(credentials);
  if (error) {
    return {
      status: error.message,
      user: null,
    };
  }
  // add user to user profile table
  const { data: existingUser } = await supabase
    .from("userDetails")
    .select("*")
    .eq("email", data.user?.email)
    .limit(1)
    .single();

  if (!existingUser) {
    const { error: insertError } = await supabase.from("userDetails").insert({
      email: data.user.email,
      userName: data.user.user_metadata.username,
    });
    if (insertError) {
      return {
        status: insertError.message,
        user: null,
      };
    }
  }

  revalidatePath("/", "layout");
  return { status: "success", user: data.user };
}
export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    redirect("/error");
  }
  revalidatePath("/", "layout"); //maybe i need to revalidate the home page on this 3 actions
  redirect("/");
}
export async function getUserSession() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return null;
  }
  return {
    status: "success",
    user: data?.user,
  };
}
export async function OAuthSignIn({ provider }: SignInWithOAuthCredentials) {
  const origin = (await headers()).get("origin");
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });
  return { data, error };
}
