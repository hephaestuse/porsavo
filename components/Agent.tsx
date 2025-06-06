import { cn } from "@/lib/utils";
import { AgentProps } from "@/types";
import Image from "next/image";
import React from "react";

enum CallStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  FINISHED = "FINISHED",
}
const messages = ["سلام من چطوری", "اخرین پیام"];
const lastMessage = messages[messages.length - 1];
function Agent({ userName }: AgentProps) {
  const callStatus = CallStatus.INACTIVE;
  const isSpeaking = true;
  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src={"/ai-avatar.png"}
              alt="vapi"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          هوش مصنوعی
        </div>

        
        <div className="card-border">
          <div className="card-content">
            <Image
              src={"/user-avatar.png"}
              alt="user avatar"
              width={540}
              height={540}
              className="rounded-full size-[120px] object-cover"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>
      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}
      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button className="relative btn-call">
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />
            <span>
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "تماس"
                : "..."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect">پایان تماس</button>
        )}
      </div>
    </>
  );
}

export default Agent;
