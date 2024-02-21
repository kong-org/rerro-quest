import classNames from "classnames";

interface IProps {
  className?: string;
  children?: React.ReactNode;
  size?: "xs" | "s" | "base";
}

export default function Text({ className, children, size = "base" }: IProps) {
  return (
    <div className={classNames("text", `text--${size}`, className)}>
      {children}
    </div>
  );
}
