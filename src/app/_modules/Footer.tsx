import React from "react";
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
  return (
    <footer
      className={classNames(
        "footer uppercase",
        { "footer--bottom": onScan },
        className
      )}
    >
      <Width>
        <Text weight="medium" size="s">
          Made in
        </Text>

        <Link href="https://kong.land">
          <KonglandFlagIcon />
        </Link>

        <ul className="footer__nav uppercase">
          {back && (
            <li>
              <Link href="/">Home</Link>
            </li>
          )}
          <li>
            <Link href="/platformer">Platformer</Link>
          </li>

          <li>
            <Link href="/leaderboard">Leaderboard</Link>
          </li>

          {onScan && (
            <li>
              <button onClick={onScan}>Scan Item</button>
            </li>
          )}
          {onRegister && (
            <li>
              <button onClick={onRegister}>Register Item</button>
            </li>
          )}
        </ul>

        <p className="footer__copy">&copy; Copyright Kong Land 2024</p>
      </Width>
    </footer>
  );
}
