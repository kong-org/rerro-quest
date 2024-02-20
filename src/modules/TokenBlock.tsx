import Box from "@/components/Box";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import classNames from "classnames";

interface IProps {
  icon: React.ReactNode;
  heading: string;
  text: string;
  className?: string;
  buttonText: string;
}

export default function TokenBlock({
  icon,
  heading,
  text,
  className,
  buttonText,
}: IProps) {
  return (
    <Box color="yellow" className={classNames("token-block", className)}>
      {icon}
      <Heading tag="h4" size={3}>
        {heading}
      </Heading>
      <Heading className="mt-1" tag="h5" size={3} bold={false}>
        {text}
      </Heading>
      <Button color="black">{buttonText}</Button>
    </Box>
  );
}
