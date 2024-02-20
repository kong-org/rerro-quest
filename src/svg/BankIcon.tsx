interface IProps {
  className?: string;
}

export default function BankIcon({ className }: IProps) {
  return (
    <svg
      className={className}
      width="19"
      viewBox="0 0 19 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.978 0H15.23v16h-1.652V8.67h-.016a3.975 3.975 0 0 0-7.916 0H5.63V16H3.978V0Z"
        fill="currentColor"
      />
      <path
        d="m.984 2.271.671 2.27h.568v9.188a.516.516 0 0 0-.516.516v.62h-.103a.516.516 0 0 0-.516.516V16h5.78v-.62a.516.516 0 0 0-.516-.516H6.25v-.619a.516.516 0 0 0-.516-.516h-.62V2.271H.984ZM13.681 13.729a.516.516 0 0 0-.516.516v.62h-.103a.516.516 0 0 0-.516.516V16h5.78v-.62a.516.516 0 0 0-.516-.516h-.103v-.619a.516.516 0 0 0-.516-.516V4.542h.567l.671-2.271H14.3v11.458h-.619Z"
        fill="currentColor"
      />
    </svg>
  );
}
