import classNames from "classnames";

interface IProps {
  className?: string;
  children?: React.ReactNode;
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
}

export default function Badge({ className, children, tag }: IProps) {
  const Tag = tag;

  return (
    <Tag className={classNames("badge", className)}>
      <span className="badge__inner">{children}</span>
    </Tag>
  );
}
