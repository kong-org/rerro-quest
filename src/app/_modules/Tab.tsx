import TabIcon from "@/app/_svg/TabIcon";
import classNames from "classnames";

interface IProps {
  className?: string;
  children?: React.ReactNode;
  onClick?(): void;
}

export default function Tab({ className, children, onClick }: IProps) {
  return (
    <button className={classNames("tab", className)} onClick={onClick}>
      <TabIcon />
      <span className="tab__text">{children}</span>
    </button>
  );
}
