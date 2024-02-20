import classNames from "classnames";
import Link from "next/link";

interface IProps {
  className?: string;
  children?: React.ReactNode;
  color?: "black";
  href?: string;
}

export default function Button({
  className,
  children,
  color = "black",
  href,
}: IProps) {
  const cls = classNames("button", `button--${color}`, className);

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return <span className={cls}>{children}</span>;
}
