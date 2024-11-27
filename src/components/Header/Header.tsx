import { FC } from 'react';

export const Header: FC = () => {
  return (
    <div
      className={
        'grid-rows-headerBlocks full-bleed grid h-[560px] w-full grid-cols-4'
      }
    >
      <div
        className={
          'bg-blue col-span-2 row-span-2 flex items-end justify-end p-10'
        }
      >
        <div>
          <h1 className={'mb-2 text-6xl font-bold'}>Заголовок</h1>
          <p className={'text-right text-3xl'}>Слоган</p>
        </div>
      </div>
      <div className={'bg-white-blue'}></div>
      <div className={'bg-blue'}></div>
      <div className={'bg-dark-blue col-span-2'}></div>
    </div>
  );
};
