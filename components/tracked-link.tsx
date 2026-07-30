"use client";

import type { ComponentProps } from "react";
import Link from "next/link";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  eventName?: string;
  eventLocation?: string;
};

export function TrackedLink({ eventName, eventLocation, onClick, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        if (eventName) {
          window.dispatchEvent(
            new CustomEvent("temis:interaction", {
              detail: { name: eventName, location: eventLocation },
            }),
          );
        }
        onClick?.(event);
      }}
    />
  );
}
