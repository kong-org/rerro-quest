"use client";

import React, { useState } from "react";
import classNames from "classnames";
import CircleIcon from "@/components/CircleIcon";
import Heading from "@/components/Heading";
import Text from "@/components/Text";
import ChevronDown from "@/svg/ChevronDown";

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
          <Text small>{children}</Text>
        </div>
      </div>
    </div>
  );
}
