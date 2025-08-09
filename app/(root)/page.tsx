import { getUserSession } from "@/actions/auth";
import { getLatestInterviews, getUserInterviews } from "@/actions/interviews";
import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function page() {
  const session = await getUserSession();

  const [userInterviews, latestInterviews] = await Promise.all([
    await getUserInterviews(session?.user.id),
    await getLatestInterviews(session?.user.id),
  ]);

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h3>Get Interview-Ready with AI-Powered Practice & Feedback</h3>
          <p className="text-lg">
            Practice real interview questions & get instant feedback.
          </p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href={"/interview"}>Start a New Interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="robot"
          width={400}
          height={400}
          className="max-lg:hidden"
        />
      </section>
      <section className="flex flex-col gap-6 mt-8">
        {session && (
          <>
            <h2>Your Past Interviews</h2>
            <div className="interviews-section max-lg:justify-center">
              {!userInterviews && (
                <p>you have not done any interview untill now</p>
              )}
              {userInterviews?.map((interview) => (
                <InterviewCard
                  key={interview.id}
                  userId={session.user.id}
                  {...interview}
                />
              ))}
            </div>
          </>
        )}
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Start an Interview</h2>
        <div className="interviews-section max-lg:justify-center">
          {!latestInterviews && (
            <div className="flex flex-col gap-4 ">
              <p>there is no interview avalible you have to Log in first</p>
              <Link className="me-auto " href={"/sign-in"}>
                <Button className="btn-primary max-sm:w-full capitalize">
                  log in
                </Button>
              </Link>
            </div>
          )}
          {latestInterviews?.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
        </div>
      </section>
    </>
  );
}

export default page;
