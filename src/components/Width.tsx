import classNames from "classnames";

interface IProps {
  className?: string;
  children?: React.ReactNode;
  padding?: "normal" | "tight";
}

export default function Width({
  className,
  children,
  padding = "normal",
}: IProps) {
  return (
    <div
      className={classNames("width", `width--padding-${padding}`, className)}
    >
      {children}
    </div>
  );
}
