import Box from "@/app/_components/Box";
import Button from "@/app/_components/Button";
import Heading from "@/app/_components/Heading";
import MaxWidth from "@/app/_components/MaxWidth";
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

      <Heading tag="h4" size={4} className="font-expanded">
        {heading}
      </Heading>

      <Heading className="mt-1" tag="h5" size={3} bold={false}>
        {text}
      </Heading>
      <Button color="black">{buttonText}</Button>
    </Box>
  );
}
