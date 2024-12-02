import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
}

export const PortfolioItem: FC<Props> = ({ title }) => {
  return (
    <li className={'basis-[260px] border border-dark-blue p-3'}>
      <div className={'mb-3 h-60 w-full bg-blue'}></div>
      <Link to='/portfolio' className={'block text-center text-2xl'}>
        {title}
      </Link>
    </li>
  );
};
