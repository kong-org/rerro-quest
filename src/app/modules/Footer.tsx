import React, { useEffect, useState } from "react";
import Width from "@/app/components/Width";
import BankIcon from "@/app/svg/BankIcon";
import XIcon from "@/app/svg/XIcon";
import classNames from "classnames";
import Link from "next/link";
import Text from "@/app/components/Text";

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
