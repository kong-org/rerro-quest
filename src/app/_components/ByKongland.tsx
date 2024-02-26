import classNames from "classnames";
import KonglandFlagIcon from "../_svg/KonglandFlagIcon";

interface IProps {
  className?: string;
  children?: React.ReactNode;
}

export default function ByKongland({ className }: IProps) {
  return (
    <h2 className={classNames("by-kongland", className)}>
      <small className="by-kongland__by">By</small>
      <KonglandFlagIcon className="by-kongland__kongland" />
    </h2>
  );
}
