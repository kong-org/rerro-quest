interface IProps {
  className?: string;
}

export default function GlassesIcon({ className }: IProps) {
  return (
    <svg
      className={className}
      width="80"
      viewBox="0 0 80 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6.197 10.12H.985v14.947h5.212V10.12Z" fill="currentColor" />
      <path
        d="M20.615 10.12H3.59v5.308h17.024V10.12Zm24.553 14.572h-29.46V30h29.46v-5.308Zm0-24.692h-29.46v5.308h29.46V0Z"
        fill="currentColor"
      />
      <path
        d="M45.166 0h-5.213v30h5.212l.001-30ZM20.952 0h-5.214v30h5.213V0Zm34.315 0h-5.213v30h5.213V0Z"
        fill="currentColor"
      />
      <path
        d="M79.514 24.692h-29.46V30h29.46v-5.308Zm0-24.692h-29.46v5.308h29.46V0Z"
        fill="currentColor"
      />
      <path
        d="M79.512 0H74.3v30h5.212V0ZM50.549 10.017h-5.87v5.309h5.871v-5.309ZM73.423 6.05h-8.877v17.825h8.877V6.049Zm-34.381 0h-8.877v17.825h8.877V6.049Z"
        fill="currentColor"
      />
    </svg>
  );
}
