import classNames from "classnames";
import Link from "next/link";

interface IProps {
  className?: string;
  children?: React.ReactNode;
  color?: "black" | "black-gradient" | "orange-gradient";
  href?: string;
  onClick?(): void;
  fullWidth?: boolean;
  shadow?: boolean;
  size?: "s" | "l";
  disabled?: boolean;
  loading?: boolean;
}

export default function Button({
  className,
  children,
  color = "black",
  href,
  onClick,
  fullWidth,
  size = "l",
  disabled,
  shadow,
  loading,
}: IProps) {
  const cls = classNames(
    "button",
    `button--${color}`,
    `button--${size}`,
    {
      "button--full-width": fullWidth,
      "button--shadow": shadow,
      "button--loading": loading,
    },
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
      <button
        disabled={disabled}
        type="button"
        onClick={onClick}
        className={cls}
      >
        {children}
      </button>
    );
  }

  return <span className={cls}>{children}</span>;
}
