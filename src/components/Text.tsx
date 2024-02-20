import classNames from "classnames";

interface IProps {
  className?: string;
  children?: React.ReactNode;
  small?: boolean;
}

export default function Text({ className, children, small }: IProps) {
  return (
    <div className={classNames("text", { "text--small": small }, className)}>
      {children}
    </div>
  );
}
