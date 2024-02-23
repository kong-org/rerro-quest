import classNames from "classnames";

interface IProps {
  className?: string;
  children?: React.ReactNode;
  color?: "white" | "grey" | "yellow";
  padding?: "normal" | "none";
  onClick?(e: any): void;
}

export default function Box({
  className,
  children,
  color = "white",
  padding = "normal",
  onClick,
}: IProps) {
  return (
    <div
      onClick={onClick}
      className={classNames(
        "box",
        `box--${color}`,
        `box--padding-${padding}`,
        className
      )}
    >
      {children}
    </div>
  );
}
