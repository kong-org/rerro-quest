import classNames from "classnames";
import React from "react";
import Width from "../_components/Width";
import Button from "@/app/_components/Button";

interface IProps {
  children?: React.ReactNode;
  className?: string;
  color?: "yellow";
  active?: boolean;
  onClose(): void;
}

export const Overlay = ({
  className,
  color = "yellow",
  children,
  active,
  onClose,
}: IProps) => {
  return (
    <div
      className={classNames(
        "overlay",
        { "overlay--active": active },
        `overlay--${color}`,
        className
      )}
    >
      <div className="overlay__inner">
        <Width>{children}</Width>
      </div>

      <Button
        onClick={onClose}
        className="overlay__close"
        color="black-gradient"
      >
        Close
      </Button>
    </div>
  );
};
