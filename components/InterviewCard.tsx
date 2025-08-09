import React from "react";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import Image from "next/image";
import { getRandomInterviewCover } from "@/app/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import DispalyTechIcon from "./DispalyTechIcon";
import { InterviewCardProps } from "@/types";
import { GetFeedbackForCards } from "@/actions/interviews";
type CardFeedback = { totalScore: number; finalAssessment: string };
dayjs.extend(jalaliday);
async function InterviewCard({
  id,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) {
  const feedback = (await GetFeedbackForCards({
    interviewId: id,
    userId,
  })) as CardFeedback[];
  const averageScore: number =
    feedback?.reduce(
      (sum: number, item: CardFeedback) => sum + item.totalScore,
      0
    ) / feedback?.length;
  const finalAssesment =
    feedback?.length > 0 ? feedback[0].finalAssessment : null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formatedDate = dayjs(createdAt || Date.now())
    .calendar("jalali")
    .format("YYYY/MM/DD");

  return (
    <div className="card-border w-[360px] max-lg:w-full min-h-96 ">
      <div className="card-interview">
        <div>
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
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
              <p>{averageScore || "---"}/100</p>
            </div>
          </div>
          {userId && (
            <div className=" mt-4 bg-gradient-to-l from-blue-500/30 to-transparent p-2 rounded ">
              <p className="line-clamp-2 font-light text-sm">
                {finalAssesment || "you have not done yet"}
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-row justify-between">
          <DispalyTechIcon techStack={techstack} />
          <Link
            href={feedback ? `/interview/${id}/feedback` : `/interview/${id}`}
          >
            <Button className="btn-primary shadow-[0_4px_15px_rgba(0,0,0)]">
              {feedback ? "view feedback" : "view interview"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InterviewCard;
