import { Link } from 'react-router-dom';
import { FC } from 'react';

interface Props {
  isAbsolutePos?: boolean;
}

export const Navigation: FC<Props> = ({ isAbsolutePos }) => {
  const className = isAbsolutePos ? 'nav-pos' : '';

  return (
    <div
      className={'flex items-center justify-between bg-white px-8 ' + className}
    >
      <h3 className={'text-2xl font-bold'}>Заголовок</h3>
      <nav>
        <ul className={'flex justify-between gap-4'}>
          <Link to={'/'} className={'cursor-pointer p-4'}>
            Обо мне
          </Link>
          <Link to={'/portfolio'} className={'cursor-pointer p-4'}>
            Портфолио
          </Link>
          <li className={'cursor-pointer p-4'}>Контакты</li>
        </ul>
      </nav>
    </div>
  );
};
