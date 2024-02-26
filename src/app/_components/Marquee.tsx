import classNames from "classnames";

interface IProps {
  children?: React.ReactNode;
  className?: string;
  repeats?: number;
  color?: "light" | "dark";
  speed?: number;
  slideWidth?: number;
  isText?: boolean;
  fade?: boolean;
}

export default function Marquee({
  className,
  children,
  repeats = 4,
  color = "light",
  speed,
  slideWidth,
  isText,
  fade,
}: IProps) {
  return (
    <div
      className={classNames(
        "marquee",
        `marquee--${color}`,
        { "marquee--fade": fade },
        className
      )}
    >
      {[...Array(repeats)].map((a, i) => (
        <div
          key={i}
          className="marquee__slide"
          style={{ animationDuration: `${speed}s`, width: slideWidth }}
        >
          {isText ? (
            <span className="marquee__text">{children}&nbsp;</span>
          ) : (
            <>{children}</>
          )}
        </div>
      ))}
    </div>
  );
}
