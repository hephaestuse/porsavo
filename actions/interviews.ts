"use server";

import { createClient } from "@/utils/supabase/server";

export async function getUserInterviews(userId: string | undefined) {
  if (userId) {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("interviews")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return data;
  } else {
    return null;
  }
}
export async function getLatestInterviews(userId: string | undefined) {
  if (userId) {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("interviews")
      .select("*")
      .eq("finalized", true)
      .neq("user_id", userId)
      .order("created_at", { ascending: false })
      .range(0, 2);

    if (error) throw new Error(error.message);

    return data;
  } else {
    return null;
  }
}
