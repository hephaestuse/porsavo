import React from "react";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import Image from "next/image";
import { getRandomInterviewCover } from "@/app/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import DispalyTechIcon from "./DispalyTechIcon";
import { Feedback, InterviewCardProps } from "@/types";
dayjs.extend(jalaliday);
function InterviewCard({
  id,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) {
  const feedback = null as Feedback | null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formatedDate = dayjs(feedback?.createdAt || createdAt || Date.now())
    .calendar("jalali")
    .format("YYYY/MM/DD");

  return (
    <div className="card-border w-[360px] max-lg:w-full min-h-96 ">
      <div className="card-interview">
        <div>
          <div className="absolute top-0 left-0 w-fit px-4 py-2 rounded-br-lg bg-light-600">
            <p className="badge-text">{normalizedType}</p>
          </div>
          <Image
            src={getRandomInterviewCover()}
            alt="cover image"
            width={90}
            height={90}
            className="rounded-full object-fill siz-[90px]"
          />
          <h3 className="capitalize">{role} interview</h3>
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Image
                src="/calendar.svg"
                alt="calendar"
                width={22}
                height={22}
              />
              <p>{formatedDate}</p>
            </div>
            <div className="flex flex-row gap-2">
              <Image src="/star.svg" alt="star" width={22} height={22} />
              <p>{feedback?.totalScore || "---"}/100</p>
            </div>
          </div>
          <div className=" mt-4 bg-gradient-to-l from-blue-500/30 to-transparent p-2 rounded ">
            <p className="line-clamp-2 font-light text-sm">
              {feedback?.finalAssessment ||
                "شما هنوز مصاحبه ای نداشته اید .یک مصاحبه برا پیشرفت شروع کنید."}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <DispalyTechIcon techStack={techstack} />
          <Button className="btn-primary shadow-[0_4px_15px_rgba(0,0,0)]">
            <Link
              href={feedback ? `/interview/${id}/feedback` : `/interview/${id}`}
            >
              {feedback ? "مشاهده نتیجه" : "مشاهده مصاحبه"}
            </Link>
          </Button>
          {}
        </div>
      </div>
    </div>
  );
}

export default InterviewCard;
