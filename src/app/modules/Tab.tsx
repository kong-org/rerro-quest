"use client";

import TabIcon from "@/app/svg/TabIcon";
import classNames from "classnames";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IProps {
  className?: string;
  children?: React.ReactNode;
  href: string;
}

export default function Tab({ className, children, href }: IProps) {
  return (
    <Link className={classNames("tab", className)} href={href}>
      <TabIcon />
      <span className="tab__text">{children}</span>
    </Link>
  );
}
