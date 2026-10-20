"use client";
import type { CookieCode } from "@/types/types";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Remember from "@/components/card/remember/Remember";
import { removeCookie, dontWarn } from "@/libs/cookies/cookieDialog";

type Props = {
  cookie: CookieCode;
};

export default function CookieDialog({ cookie }: Props) {
  const [remember, setRemember] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  return (
    <>
      {cookie.code === "INVALID_LANG" && (
        <dialog>
          <p>{cookie.code}</p>
          <p>Your saved language is invalid or the cookie is corrupted.</p>

          <button onClick={() => removeCookie()}>Go to home</button>
        </dialog>
      )}

      {cookie.code === "LANG_NOT_EQUAL" && (
        <dialog ref={dialogRef} open>
          <p>
            Your saved language differs from the current page. <br></br>Would
            you like to continue or go to your preferred language?
          </p>
          <p>Don&apos;t warn me again</p>
          <Remember onChange={setRemember} />
          <button
            onClick={() => {
              dialogRef.current?.close();
              router.push(`/${cookie.languageVal}`);
            }}
          >
            Go to {cookie.languageName}
          </button>

          <button
            onClick={() => {
              dontWarn(remember);
              dialogRef.current?.close();
            }}
          >
            Continue
          </button>
        </dialog>
      )}
    </>
  );
}
