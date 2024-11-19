import { FC } from 'react';
import { Navigation } from '../Navigation';

export const Header: FC = () => {
  return (
    <>
      <section
        className={
          'full-bleed relative hidden h-[560px] w-full grid-cols-4 grid-rows-headerBlocks md:grid'
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
      </section>
      <section
        className={
          'flex h-[300px] flex-col items-end justify-end px-6 md:hidden'
        }
      >
        <div>
          <h1 className={'mb-2 text-4xl font-bold'}>Заголовок</h1>
          <p className={'text-right text-2xl'}>Слоган</p>
        </div>
      </section>
    </>
  );
};
