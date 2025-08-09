"use server";
import { GoogleGenAI, Type } from "@google/genai";
import { feedbackSchema } from "@/constants";
import {
  CreateFeedbackParams,
  FeedbackResult,
  GetFeedbackByInterviewIdParams,
  GetFeedbackForCardsParams,
} from "@/types";
import { createClient } from "@/utils/supabase/server";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";

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
export async function getInterviewsById(InterViewId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("interviews")
    .select("*")
    .eq("id", InterViewId)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function createFeedback(feedbackParama: FeedbackResult) {
  const {
    userId,
    interviewId,
    totalScore,
    categoryScores,
    strengths,
    areasForImprovement,
    finalAssessment,
  } = feedbackParama;
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("feedback")
      .insert([
        {
          userId,
          interviewId,
          totalScore,
          categoryScores,
          strengths,
          areasForImprovement,
          finalAssessment,
        },
      ])
      .select();
    if (error) {
      return {
        status: false,
        feedbackId: null,
      };
    }
    return {
      status: true,
      feedbackId: data[0].id,
    };
  } catch (error) {
    console.log("error feedback DB post");
    return {
      status: false,
      feedbackId: null,
    };
  }
}

export async function GetFeedbackByInterviewId({
  interviewId,
  userId,
}: GetFeedbackByInterviewIdParams) {
  if (userId) {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("feedback")
      .select("*")
      .eq("interviewId", interviewId)
      .eq("userId", userId)
      .order("created_at", { ascending: false });

    if (error) return console.log(error);
    return data;
  }
}
export async function GetFeedbackForCards({
  interviewId,
  userId,
}: GetFeedbackForCardsParams) {
  if (userId) {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("feedback")
      .select("totalScore,finalAssessment")
      .eq("interviewId", interviewId)
      .eq("userId", userId)
      .order("totalScore", { ascending: false });

    if (error) return console.log(error);
    return data;
  }
}
