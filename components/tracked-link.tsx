"use client";

import type { ComponentProps } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  eventName?: string;
  eventLocation?: string;
};

export function TrackedLink({ eventName, eventLocation, onClick, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        if (eventName) track(eventName, eventLocation ? { location: eventLocation } : undefined);
        onClick?.(event);
      }}
    />
  );
}
