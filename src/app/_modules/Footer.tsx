"use client";

import React, { useEffect } from "react";
import Width from "@/app/_components/Width";
import classNames from "classnames";
import Link from "next/link";
import Text from "@/app/_components/Text";
import KonglandFlagIcon from "../_svg/KonglandFlagIcon";

interface IProps {
  className?: string;
  onScan?(): void;
  onRegister?(): void;
  back?: boolean;
}

export default function Footer({
  className,
  onScan,
  onRegister,
  back,
}: IProps) {
  const handleClear = () => {
    localStorage.removeItem("addressInput");
    localStorage.removeItem("address");
    window.location.reload();
  };

  return (
    <footer
      className={classNames(
        "footer uppercase",
        { "footer--bottom": onScan },
        className
      )}
    >
      <Width>
        <Text className="font-expanded">
          <span style={{ fontSize: 10 }}>Made in</span>
        </Text>

        <Link target="_blank" href="https://kong.land">
          <KonglandFlagIcon />
        </Link>

        <ul className="footer__nav uppercase">
          {back && (
            <li>
              <Link href="/">Home</Link>
            </li>
          )}
          <li className="desktop-only">
            <Link href="/platformer">Platformer</Link>
          </li>

          <li>
            <Link href="/leaderboard">Leaderboard</Link>
          </li>

          {onScan && (
            <li>
              <button className="uppercase font-expanded" onClick={onScan}>
                Scan Item
              </button>
            </li>
          )}
          {onRegister && (
            <li>
              <button className="uppercase font-expanded" onClick={onRegister}>
                Register Item
              </button>
            </li>
          )}
          <li>
            <button className="uppercase font-expanded" onClick={handleClear}>
              Clear saved address
            </button>
          </li>
        </ul>

        <p className="footer__copy">&copy; Copyright Kong Land 2024</p>
      </Width>
    </footer>
  );
}
