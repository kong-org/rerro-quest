import React, { useEffect, useState } from "react";
import Width from "@/app/_components/Width";
import BankIcon from "@/app/_svg/BankIcon";
import XIcon from "@/app/_svg/XIcon";
import classNames from "classnames";
import Link from "next/link";
import Text from "@/app/_components/Text";

interface IProps {
  className?: string;
}

export default function Footer({ className }: IProps) {
  return (
    <footer className={classNames("footer", className)}>
      <Width>
        <Text className="text-center">
          <p>Footer info</p>
        </Text>
      </Width>
    </footer>
  );
}
