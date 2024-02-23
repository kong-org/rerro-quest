import classNames from "classnames";

interface IProps {
  className?: string;
  children?: React.ReactNode;
  size?: "small" | "normal";
}

export default function PlainBadge({
  className,
  children,
  size = "normal",
}: IProps) {
  return (
    <div
      className={classNames("plain-badge", `plain-badge--${size}`, className)}
    >
      {children}
    </div>
  );
}
