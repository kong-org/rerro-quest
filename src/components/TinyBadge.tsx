import classNames from "classnames";

interface IProps {
  className?: string;
  children?: React.ReactNode;
}

export default function TinyBadge({ className, children }: IProps) {
  return <div className={classNames("tiny-badge", className)}>{children}</div>;
}
