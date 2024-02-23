interface IProps {
  className?: string;
}

export default function XIcon({ className }: IProps) {
  return (
    <svg
      className={className}
      width="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.516 6.776 15.468 0h-1.41l-5.17 5.882L4.76 0H0l6.242 8.896L0 16h1.41l5.457-6.213L11.226 16h4.76M1.92 1.041h2.166l9.972 13.969H11.89"
        fill="currentColor"
      />
    </svg>
  );
}
