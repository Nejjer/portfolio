import { FC, InputHTMLAttributes } from 'react';

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  return (
    <input
      className={'border-grey4 h-14 border-2 px-4 py-3 text-2xl ' + className}
      {...props}
    />
  );
};
