import classNames from "classnames";

interface IProps {
  className?: string;
  children?: React.ReactNode;
  color?: "white" | "grey" | "yellow";
}

export default function Box({ className, children, color = "white" }: IProps) {
  return (
    <div className={classNames("box", `box--${color}`, className)}>
      {children}
    </div>
  );
}
