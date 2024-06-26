import React from "react";
import classNames from "classnames";

interface IProps {
  className?: string;
  children?: React.ReactNode;
  size: 1 | 2 | 3 | 4 | 5 | 6;
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  bold?: boolean;
  color?: "orange" | "black";
}

export default function Heading({
  className,
  children,
  size,
  tag,
  bold = true,
  color = "black",
}: IProps) {
  const cls = classNames(
    "heading",
    `heading--${size}`,
    `heading--${color}`,
    { "heading--bold": bold },
    className
  );

  const Tag = tag;

  return <Tag className={cls}>{children}</Tag>;
}
