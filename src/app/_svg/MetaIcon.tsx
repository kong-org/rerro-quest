interface IProps {
  className?: string;
}

export default function MetaIcon({ className }: IProps) {
  return (
    <svg
      className={className}
      width="26"
      viewBox="0 0 26 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.6554 0V25.7215H11.2067V0H0.833557V30H4.28224V4.27852H7.74446V30H18.104V4.27852H21.5663V30H25.015V0H14.6554Z"
        fill="currentColor"
      />
    </svg>
  );
}
