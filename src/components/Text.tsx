import classNames from "classnames";

interface IProps {
  className?: string;
  children?: React.ReactNode;
}

export default function Text({ className, children }: IProps) {
  return <div className={classNames("text", className)}>{children}</div>;
}
