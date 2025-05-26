import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>برای مصاحبه آماده شو </h2>
          <h3>باتمرینات وتحلیل های هوش مصنوعی پرساوو</h3>
          <p className="text-lg">
            یک مصاحبه واقعی رو تمرین کن و در لحظه تحلیل نتایجتو دریافت کن
          </p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href={"/interview"}>شروع مصاحبه</Link>
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
        <h2>مصاحبه های شما</h2>
        <div className="interviews-section max-lg:justify-center">
          {!dummyInterviews && <p>شما تا کنون هیچ مصاحبه ای نداشته اید </p>}
          {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>یک مصاحبه شروع کنید</h2>
        <div className="interviews-section max-lg:justify-center">
          {!dummyInterviews && <p>در حال حاظر هیچ مصاحبه ای در دسترس نیست</p>}
          {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
        </div>
      </section>
    </>
  );
}

export default page;
