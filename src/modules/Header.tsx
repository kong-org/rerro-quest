"use client";

import React, { useEffect, useState } from "react";
import Width from "@/components/Width";
import BankIcon from "@/svg/BankIcon";
import XIcon from "@/svg/XIcon";
import classNames from "classnames";
import Link from "next/link";

interface IProps {
  className?: string;
}

export default function Header({ className }: IProps) {
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
              <Link className="header-icons__anchor" href="https://x.com">
                <XIcon />
              </Link>
            </li>
            <li className="header-icons__item">
              <Link className="header-icons__anchor" href="https://google.com">
                <BankIcon />
              </Link>
            </li>
          </ul>
          <ul className="header-nav">
            <li className="header-nav__item">
              <Link className="header-nav__anchor" href="/leaderboards">
                Leaderboards
              </Link>
            </li>
          </ul>
        </div>
      </Width>
    </header>
  );
}