import Box from "@/app/_components/Box";
import Width from "@/app/_components/Width";
import classNames from "classnames";
import React from "react";

interface IProps {
  children?: React.ReactNode;
  className?: string;
  active?: boolean;
  onClose(): void;
}

export default function Popup({
  children,
  className,
  active,
  onClose,
}: IProps) {
  return (
    <div
      onClick={onClose}
      className={classNames("popup", { "popup--active": active }, className)}
    >
      <div className="popup__inner">
        <Width>
          <Box onClick={(e: any) => e.stopPropagation()}>{children}</Box>
        </Width>
      </div>
    </div>
  );
}
