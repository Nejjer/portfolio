import { Link } from 'react-router-dom';
import { FC, useState } from 'react';
import Burger from './Burger.svg?react';

interface Props {
  isAbsolutePos?: boolean;
}

export const Navigation: FC<Props> = ({ isAbsolutePos }) => {
  const className = isAbsolutePos ? 'nav-pos' : '';
  const [active, setActive] = useState(false);

  window.onclick = () => setActive(false);

  return (
    <>
      <div
        className={
          'hidden items-center justify-between bg-white px-8 md:flex ' +
          className
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
      <div
        className={`bg-white-transparent fixed right-5 top-5 flex ${active ? 'h-auto' : 'h-10'} ${active ? 'w-36' : 'w-10'} cursor-pointer items-center justify-center rounded-[20px] transition-all md:hidden`}
      >
        <Burger
          onClick={(e) => {
            e.stopPropagation();
            setActive((active) => !active);
          }}
          className={active ? 'hidden' : 'block'}
        />
        <nav className={active ? 'block' : 'hidden'}>
          <ul className={'flex flex-col justify-between gap-2'}>
            <Link to={'/aboutme'} className={'cursor-pointer p-2'}>
              Обо мне
            </Link>
            <Link to={'/portfolio'} className={'cursor-pointer px-2'}>
              Портфолио
            </Link>
            <Link to={'contacts'} className={'cursor-pointer p-2'}>
              Контакты
            </Link>
          </ul>
        </nav>
      </div>
    </>
  );
};
