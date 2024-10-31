import { FC } from 'react';

interface Props {
  title: string;
}

export const PortfolioItem: FC<Props> = ({ title }) => {
  return (
    <li className={'border-dark-blue basis-[260px] border p-3'}>
      <div className={'bg-blue mb-3 h-60 w-full'}></div>
      <a href='/' className={'block text-center text-2xl'}>
        {title}
      </a>
    </li>
  );
};
