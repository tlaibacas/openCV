"use client";

import { useRef } from "react";

type Props = {
  message?: string;
};

export default function CookieDialog({ message }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <dialog ref={dialogRef} open>
      <p>{message}</p>
      <button onClick={() => dialogRef.current?.close()}>Close</button>
    </dialog>
  );
}
