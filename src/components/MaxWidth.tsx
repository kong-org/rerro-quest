import classNames from "classnames";

interface IProps {
  className?: string;
  children?: React.ReactNode;
  size?:
    | "300"
    | "320"
    | "400"
    | "430"
    | "500"
    | "510"
    | "600"
    | "640"
    | "700"
    | "800"
    | "900";
}

export default function MaxWidth({ className, size, children }: IProps) {
  return (
    <div className={classNames("max-width", `max-width--${size}`, className)}>
      {children}
    </div>
  );
}
