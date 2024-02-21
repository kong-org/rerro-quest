import classNames from "classnames";
import React from "react";

interface IProps {
  className?: string;
  children?: React.ReactNode;
  size: "xs" | "xs" | "s" | "m" | "l" | "xl" | "flex";
}

export default function TableCell({ className, children, size }: IProps) {
  return (
    <div className={classNames("table-cell", `table-cell--${size}`, className)}>
      {children}
    </div>
  );
}
