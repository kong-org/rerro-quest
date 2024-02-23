import Width from "@/app/components/Width";
import classNames from "classnames";

interface IProps {
  children?: React.ReactNode;
  className?: string;
  padding?: "tight" | "normal";
}

export default function Hero({
  className,
  children,
  padding = "normal",
}: IProps) {
  return (
    <div className={classNames("hero", `hero--padding-${padding}`, className)}>
      <div className="hero__inner">
        <Width>{children}</Width>
      </div>
    </div>
  );
}
