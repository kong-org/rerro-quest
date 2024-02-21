import classNames from "classnames";
import React from "react";

interface IProps {
  className?: string;
  children?: React.ReactNode;
}

export default function TableHeader({ className, children }: IProps) {
  return (
    <div className={classNames("table-header", className)}>{children}</div>
  );
}
