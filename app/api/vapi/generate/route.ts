import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/app/utils";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  return Response.json({ success: true, data: "thank you" }, { status: 200 });
}

export async function POST(request: Request) {
  const supabase = await createClient();

  const { type, role, level, techstack, amount, userid } = await request.json();

  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]`,
    });

    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(","),
      questions: JSON.parse(
        questions
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim()
      ),
      user_id: userid, // 🟢 از camelCase به snake_case
      finalized: true,
      cover_image: getRandomInterviewCover(), // 🟢 همینطور
    };

    const { data, error } = await supabase
      .from("interviews")
      .insert([interview]);

    if (error) {
      console.error("Supabase insert error:", error);
      return Response.json({ success: false, error }, { status: 500 });
    }

    return Response.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}
