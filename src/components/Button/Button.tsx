/// <reference types="vite-plugin-svgr/client" />
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  forwardRef,
  ReactNode,
} from 'react';
import Arrow from './arrow.svg?react';

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: ReactNode;
  minimized?: boolean;
}

export const Button: FC<Props> = forwardRef(
  ({ children, className, disabled, minimized, ...props }, ref) => (
    <button
      className={
        (minimized
          ? 'flex h-[20px] w-7 items-center justify-center rounded-[10px] border border-black '
          : 'flex h-14 items-center justify-center bg-blue p-4 text-2xl text-white ') +
        className
      }
      disabled={disabled}
      ref={ref}
      {...props}
    >
      {children}
      {minimized && <Arrow />}
    </button>
  ),
);
