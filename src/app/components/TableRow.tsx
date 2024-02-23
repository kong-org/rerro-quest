import classNames from "classnames";
import React from "react";

interface IProps {
  className?: string;
  children?: React.ReactNode;
  highlighted?: boolean;
}

export default function TableRow({ className, children, highlighted }: IProps) {
  return (
    <div
      className={classNames(
        "table-row",
        { "table-row--highlighted": highlighted },
        className
      )}
    >
      {children}
    </div>
  );
}
