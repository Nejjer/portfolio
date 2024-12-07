import { FC, InputHTMLAttributes } from 'react';

export const Textarea: FC<InputHTMLAttributes<HTMLTextAreaElement>> = ({
  className,
  ...props
}) => {
  return (
    <textarea
      className={'border-grey4 border-2 px-4 py-3 text-2xl ' + className}
      {...props}
    />
  );
};
