import { getInterviewsById } from "@/actions/interviews";
import { getRandomInterviewCover } from "@/app/utils";
import { RouteParams } from "@/types";
import Image from "next/image";
import { redirect } from "next/navigation";
import DispalyTechIcon from "@/components/DispalyTechIcon";
import React from "react";
import Agent from "@/components/Agent";
import { getUserSession } from "@/actions/auth";

async function page({ params }: RouteParams) {
  const { id } = await params;
  const interview = await getInterviewsById(id);
  
  const userSession = await getUserSession();

  if (!interview) redirect("/");
  return (
    <>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4 items-center">
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={40}
              height={40}
              className="rounded-full object-cover size-[40px]"
            />
            <h3 className="capitalize">{interview.role} Interview</h3>
          </div>

          <DispalyTechIcon techStack={interview.techstack} />
        </div>

        <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit">
          {interview.type}
        </p>
      </div>
      <Agent
        userName={userSession?.user.user_metadata.user_name}
        userId={userSession?.user.id!}
        interviewId={id}
        type="interview"
        questions={interview.questions}
      />
    </>
  );
}

export default page;
