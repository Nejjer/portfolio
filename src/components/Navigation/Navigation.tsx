import { Link } from 'react-router-dom';
import { FC } from 'react';

interface Props {
  isAbsolutePos?: boolean;
}

export const Navigation: FC<Props> = ({ isAbsolutePos }) => {
  const className = isAbsolutePos ? 'nav-pos' : '';

  return (
    <div
      className={
        'hidden items-center justify-between bg-white px-8 md:flex ' + className
      }
    >
      <Link to={'/'}>
        <h3 className={'text-2xl font-bold'}>Заголовок</h3>
      </Link>
      <nav>
        <ul className={'flex justify-between gap-4'}>
          <Link to={'/aboutme'} className={'cursor-pointer p-4'}>
            Обо мне
          </Link>
          <Link to={'/portfolio'} className={'cursor-pointer p-4'}>
            Портфолио
          </Link>
          <Link to={'contacts'} className={'cursor-pointer p-4'}>
            Контакты
          </Link>
        </ul>
      </nav>
    </div>
  );
};
