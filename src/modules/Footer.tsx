import React, { useEffect, useState } from "react";
import Width from "@/components/Width";
import BankIcon from "@/svg/BankIcon";
import XIcon from "@/svg/XIcon";
import classNames from "classnames";
import Link from "next/link";
import Text from "@/components/Text";

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
