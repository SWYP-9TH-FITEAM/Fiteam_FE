import * as React from 'react';

import {cn} from '@/lib/utils';

interface StepBarProps {
  enabled?: boolean;
  label: string;
  isEnd?: boolean;
  className?: string;
}

export const StepBar: React.FC<StepBarProps> = ({
  enabled = false,
  label,
  isEnd = false,
  className,
}) => {
  return (
    <div className={cn('relative', className)}>
      {!isEnd && (enabled ? <Enabled /> : <Disabled />)}
      {isEnd && (enabled ? <EndEnabled /> : <EndDisabled />)}
      <span
        className={cn(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-medium',
          enabled && 'text-white',
        )}
      >
        {label}
      </span>
      {!isEnd && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="66"
          viewBox="0 0 34 66"
          fill="none"
          className="absolute top-[2.5px] right-4"
        >
          <path d="M1 65L32 33L1 1" stroke="white" strokeWidth="2" />
        </svg>
      )}
    </div>
  );
};

const Enabled = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="405"
    height="72"
    viewBox="0 0 405 72"
    fill="none"
  >
    <mask
      id="path-1-outside-1_1918_192"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="405"
      height="72"
      fill="black"
    >
      <rect fill="white" width="405" height="72" />
      <path d="M366 6L396 36L366 66H6V6H366Z" />
    </mask>
    <path
      d="M366 6L396 36L366 66H6V6H366Z"
      fill="url(#paint0_linear_1918_192)"
    />
    <path
      d="M366 6L370.243 1.75736L368.485 0H366V6ZM396 36L400.243 40.2426L404.485 36L400.243 31.7574L396 36ZM366 66V72H368.485L370.243 70.2426L366 66ZM6 66H0V72H6V66ZM6 6V0H0V6H6ZM366 6L361.757 10.2426L391.757 40.2426L396 36L400.243 31.7574L370.243 1.75736L366 6ZM396 36L391.757 31.7574L361.757 61.7574L366 66L370.243 70.2426L400.243 40.2426L396 36ZM366 66V60H6V66V72H366V66ZM6 66H12V6H6H0V66H6ZM6 6V12H366V6V0H6V6Z"
      fill="#F9F9F9"
      mask="url(#path-1-outside-1_1918_192)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1918_192"
        x1="6"
        y1="36"
        x2="661.814"
        y2="36"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#7F6FFD" />
        <stop offset="0.35" stopColor="#5F4AFF" />
        <stop offset="0.85" stopColor="#4432CE" />
      </linearGradient>
    </defs>
  </svg>
);

const Disabled = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="405"
    height="72"
    viewBox="0 0 405 72"
    fill="none"
  >
    <mask
      id="path-1-outside-1_1918_238"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="405"
      height="72"
      fill="black"
    >
      <rect fill="white" width="405" height="72" />
      <path d="M366 6L396 36L366 66H6V6H366Z" />
    </mask>
    <path d="M366 6L396 36L366 66H6V6H366Z" fill="#EDEFF1" />
    <path
      d="M366 6L370.243 1.75736L368.485 0H366V6ZM396 36L400.243 40.2426L404.485 36L400.243 31.7574L396 36ZM366 66V72H368.485L370.243 70.2426L366 66ZM6 66H0V72H6V66ZM6 6V0H0V6H6ZM366 6L361.757 10.2426L391.757 40.2426L396 36L400.243 31.7574L370.243 1.75736L366 6ZM396 36L391.757 31.7574L361.757 61.7574L366 66L370.243 70.2426L400.243 40.2426L396 36ZM366 66V60H6V66V72H366V66ZM6 66H12V6H6H0V66H6ZM6 6V12H366V6V0H6V6Z"
      fill="#F9F9F9"
      mask="url(#path-1-outside-1_1918_238)"
    />
  </svg>
);

const EndDisabled = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="360"
    height="72"
    viewBox="0 0 372 72"
    fill="none"
  >
    <mask
      id="path-1-outside-1_1918_203"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="372"
      height="72"
      fill="black"
    >
      <rect fill="white" width="372" height="72" />
      <path d="M366 66H6V6H366V66Z" />
    </mask>
    <path d="M366 66H6V6H366V66Z" fill="#EDEFF1" />
    <path
      d="M366 66V72H372V66H366ZM6 66H0V72H6V66ZM6 6V0H0V6H6ZM366 6H372V0H366V6ZM366 66V60H6V66V72H366V66ZM6 66H12V6H6H0V66H6ZM6 6V12H366V6V0H6V6ZM366 6H360V66H366H372V6H366Z"
      fill="#F9F9F9"
      mask="url(#path-1-outside-1_1918_203)"
    />
  </svg>
);

const EndEnabled = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="360"
    height="72"
    viewBox="0 0 360 60"
    fill="none"
  >
    <path d="M360 60H0V0H360V60Z" fill="url(#paint0_linear_1918_1184)" />
    <defs>
      <linearGradient
        id="paint0_linear_1918_1184"
        x1="0"
        y1="30"
        x2="608.496"
        y2="30"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#9182FF" />
        <stop offset="0.346154" stopColor="#5F4AFF" />
        <stop offset="1" stopColor="#4432CE" />
      </linearGradient>
    </defs>
  </svg>
);
