"use client";

import React, { useState } from "react";
import classNames from "classnames";
import CircleIcon from "@/app/_components/CircleIcon";
import Heading from "@/app/_components/Heading";
import Text from "@/app/_components/Text";
import ChevronDown from "@/app/_svg/ChevronDown";

interface IProps {
  question?: string;
  children: React.ReactNode;
  className?: string;
}

export default function FAQQuestion({ className, question, children }: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div
      className={classNames(
        "faq-question",
        {
          "faq-question--active": isOpen,
        },
        className
      )}
    >
      <header className="faq-question__header" onClick={toggleOpen}>
        <Heading tag="h3" size={5}>
          {question}
        </Heading>

        <CircleIcon>
          <ChevronDown />
        </CircleIcon>
      </header>
      <div
        className={classNames("faq-question__body", {
          "faq-question__body--hidden": !isOpen,
        })}
      >
        <div className="faq-question__body-inner">
          <Text size="s">{children}</Text>
        </div>
      </div>
    </div>
  );
}
