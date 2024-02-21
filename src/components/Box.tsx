import classNames from "classnames";

interface IProps {
  className?: string;
  children?: React.ReactNode;
  color?: "white" | "grey" | "yellow";
  padding?: "normal" | "none";
}

export default function Box({
  className,
  children,
  color = "white",
  padding = "normal",
}: IProps) {
  return (
    <div
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
