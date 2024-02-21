import React from "react";

export default function TabIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="322"
      fill="none"
      viewBox="0 0 322 72"
    >
      <g filter="url(#a)">
        <path
          fill="url(#b)"
          d="M321 71H1l31.35-57.11C36.69 5.99 45.55 1 55.24 1h211.52c9.69 0 18.55 4.99 22.89 12.89L321 71Z"
        />
      </g>
      <path
        stroke="#FF00A8"
        strokeMiterlimit="10"
        d="M321 71H1l31.35-57.11C36.69 5.99 45.55 1 55.24 1h211.52c9.69 0 18.55 4.99 22.89 12.89L321 71Z"
      />
      <defs>
        <linearGradient
          id="b"
          x1="161"
          x2="161"
          y1="1"
          y2="71"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFD70E" />
          <stop offset="1" stopColor="#FF0F00" />
        </linearGradient>
        <filter
          id="a"
          width="321.69"
          height="71"
          x=".155"
          y=".5"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="3" />
          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0.988235 0 0 0 0 0.988235 0 0 0 0 0.988235 0 0 0 0.5 0" />
          <feBlend in2="shape" result="effect1_innerShadow_104_732" />
        </filter>
      </defs>
    </svg>
  );
}
