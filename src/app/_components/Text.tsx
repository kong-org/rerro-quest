import classNames from "classnames";

interface IProps {
  className?: string;
  children?: React.ReactNode;
  size?: "xs" | "s" | "base" | "lg";
  weight?: "base" | "medium";
}

export default function Text({
  className,
  children,
  size = "base",
  weight = "base",
}: IProps) {
  return (
    <div
      className={classNames(
        "text",
        `text--${size}`,
        `text--${weight}`,
        className
      )}
    >
      {children}
    </div>
  );
}
