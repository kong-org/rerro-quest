"use client";

import TabIcon from "@/svg/TabIcon";
import classNames from "classnames";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IProps {
  className?: string;
  children?: React.ReactNode;
  href: string;
}

export default function Tab({ className, children, href }: IProps) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20 && !isActive) {
        setIsActive(true);
      } else if (window.scrollY <= 20 && isActive) {
        setIsActive(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isActive]);

  return (
    <Link
      className={classNames("tab", { "tab--active": isActive }, className)}
      href={href}
    >
      <TabIcon />
      <span className="tab__text">{children}</span>
    </Link>
  );
}
