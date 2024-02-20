import classNames from "classnames";

interface IProps {
  children?: React.ReactNode;
  className?: string;
  repeats?: number;
  color?: "light" | "dark";
  speed?: number;
  slideWidth?: number;
}

export default function Marquee({
  className,
  children,
  repeats = 4,
  color = "light",
  speed,
  slideWidth,
}: IProps) {
  return (
    <div className={classNames("marquee", `marquee--${color}`, className)}>
      {[...Array(repeats)].map(() => (
        <div
          className="marquee__slide"
          style={{ animationDuration: `${speed}s`, width: slideWidth }}
        >
          <span className="marquee__text">{children}&nbsp;</span>
        </div>
      ))}
    </div>
  );
}
