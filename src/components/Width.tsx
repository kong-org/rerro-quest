import classNames from "classnames";

interface IProps {
  className?: string;
  children?: React.ReactNode;
}

export default function Width({ className, children }: IProps) {
  return <div className={classNames("width", className)}>{children}</div>;
}
