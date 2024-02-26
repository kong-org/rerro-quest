"use client";

import React, { useEffect, useState } from "react";
import Width from "@/app/_components/Width";
import BankIcon from "@/app/_svg/BankIcon";
import XIcon from "@/app/_svg/XIcon";
import classNames from "classnames";
import Link from "next/link";
import Button from "../_components/Button";

interface IProps {
  className?: string;
  showBack?: boolean;
}

export default function Header({ className, showBack }: IProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeBlurred = window.scrollY > 20;
      setIsScrolled(shouldBeBlurred);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={classNames(
        "header",
        { "header--blurred-back": isScrolled },
        className
      )}
    >
      <Width>
        <div className="header__flex">
          <ul className="header-icons">
            <li className="header-icons__item">
              <Link
                className="header-icons__anchor"
                href="https://x.com/Kongiscash"
                target="_blank"
              >
                <XIcon />
              </Link>
            </li>
            <li className="header-icons__item">
              <Link
                className="header-icons__anchor"
                href="https://warpcast.com/~/channel/kongland"
                target="_blank"
              >
                <BankIcon />
              </Link>
            </li>
          </ul>
          <ul className="header-nav">
            <li className="header-nav__item">
              {!showBack ? (
                <Link className="header-nav__anchor" href="/leaderboards">
                  Leaderboards
                </Link>
              ) : (
                <Link className="header-nav__anchor" href="/">
                  Back
                </Link>
              )}
            </li>
            {!showBack && (
              <li>
                <Button rounded size="s" color="orange-gradient">
                  Start scanning
                </Button>
              </li>
            )}
          </ul>
        </div>
      </Width>
    </header>
  );
}
