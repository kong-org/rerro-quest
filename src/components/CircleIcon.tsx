import classNames from "classnames";

interface IProps {
  className?: string;
  color?: "yellow";
  children?: React.ReactNode;
}

export default function CircleIcon({
  className,
  children,
  color = "yellow",
}: IProps) {
  return (
    <div
      className={classNames("circle-icon", `circle-icon--${color}`, className)}
    >
      {children}
    </div>
  );
}
