import Width from "@/components/Width";
import classNames from "classnames";

interface IProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Hero({ className, children }: IProps) {
  return (
    <div className={classNames("hero", children)}>
      <div className="hero__inner">
        <Width>{children}</Width>
      </div>
    </div>
  );
}
