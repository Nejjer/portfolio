import { FC } from 'react';
import { Navigation } from '../../../components/Navigation';

export const Header: FC = () => {
  return (
    <section className={'mb-32 flex flex-col'}>
      <div className={'p-4'}>
        <Navigation />
      </div>
      <div className={'mt-9 flex gap-10'}>
        <div className={'h-[400px] w-[360px] bg-dark-blue'}></div>
        <div className={'flex flex-grow flex-col'}>
          <p className={'text-xl'}>Обо мне</p>
          <h2 className={'text-5xl font-bold'}>Заголовок</h2>
          <div className={'mt-4 h-full bg-grey1'}></div>
        </div>
      </div>
    </section>
  );
};
