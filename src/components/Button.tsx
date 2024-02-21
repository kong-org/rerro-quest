import classNames from "classnames";
import Link from "next/link";

interface IProps {
  className?: string;
  children?: React.ReactNode;
  color?: "black";
  href?: string;
  onClick?(): void;
  fullWidth?: boolean;
}

export default function Button({
  className,
  children,
  color = "black",
  href,
  onClick,
  fullWidth,
}: IProps) {
  const cls = classNames(
    "button",
    `button--${color}`,
    { "button--full-width": fullWidth },
    className
  );

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cls}>
        {children}
      </button>
    );
  }

  return <span className={cls}>{children}</span>;
}
