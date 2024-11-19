import { FC } from 'react';
import { Navigation } from '../Navigation';

export const Header: FC = () => {
  return (
    <div
      className={
        'full-bleed relative grid h-[560px] w-full grid-cols-4 grid-rows-headerBlocks'
      }
    >
      <Navigation isAbsolutePos={true} />
      <div
        className={
          'col-span-2 row-span-2 flex items-end justify-end bg-blue p-10'
        }
      >
        <div>
          <h1 className={'mb-2 text-6xl font-bold'}>Заголовок</h1>
          <p className={'text-right text-3xl'}>Слоган</p>
        </div>
      </div>
      <div className={'bg-white-blue'}></div>
      <div className={'bg-blue'}></div>
      <div className={'col-span-2 bg-dark-blue'}></div>
    </div>
  );
};
