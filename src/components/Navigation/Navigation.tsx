import { FC } from 'react';

export const Navigation: FC = () => {
  return (
    <div
      className={
        'nav-pos flex w-[94vw] items-center justify-between bg-white px-8'
      }
    >
      <h3 className={'text-2xl font-bold'}>Заголовок</h3>
      <nav>
        <ul className={'flex justify-between gap-4'}>
          <li className={'cursor-pointer p-4'}>Обо мне</li>
          <li className={'cursor-pointer p-4'}>Портфолио</li>
          <li className={'cursor-pointer p-4'}>Контакты</li>
        </ul>
      </nav>
    </div>
  );
};
