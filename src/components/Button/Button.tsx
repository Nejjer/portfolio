import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  forwardRef,
  ReactNode,
} from 'react';

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: ReactNode;
}

export const Button: FC<Props> = forwardRef(
  ({ children, className, disabled, ...props }, ref) => (
    <button
      className={
        'bg-blue flex h-14 items-center justify-center p-4 text-2xl text-white ' +
        className
      }
      disabled={disabled}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  ),
);
