import Box from "@/components/Box";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import MaxWidth from "@/components/MaxWidth";
import classNames from "classnames";
import Image from "next/image";

interface IProps {
  iconSrc: string;
  heading: string;
  text: string;
  className?: string;
  buttonText: string;
}

export default function TokenBlock({
  iconSrc,
  heading,
  text,
  className,
  buttonText,
}: IProps) {
  return (
    <Box color="yellow" className={classNames("token-block", className)}>
      <MaxWidth size="100" className="mb-5">
        <Image
          className="image"
          width="100"
          height="98"
          src={iconSrc}
          alt={heading}
        />
      </MaxWidth>

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
