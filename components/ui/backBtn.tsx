"use client";

import { ChevronLeft, CircleChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function BackBtn() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname !== "/") {
    return (
      <button
        onClick={() => {
          if (window.history.length > 1) {
            router.back();
          } else {
            router.push("/");
          }
        }}
        className="w-fit me-4 rounded-full text-white hover:scale-110"
      >
        <CircleChevronLeft />
      </button>
    );
  } else {
    return null;
  }
}
