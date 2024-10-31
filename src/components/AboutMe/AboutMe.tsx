import { FC } from 'react';

export const AboutMe: FC = () => {
  return (
    <section className={'mt-32 flex w-full gap-10'}>
      <div className={'bg-dark-blue h-[400px] w-[360px]'}></div>
      <div className={'flex flex-grow flex-col'}>
        <p className={'text-xl'}>Меня зовут</p>
        <h2 className={'text-5xl font-bold'}>Малыгина Наталья</h2>
        <p className={'mt-4 text-2xl'}>
          автор N научных публикаций, участник M конференций, etc
        </p>

        <div className={'bg-grey1 mt-4 h-full'}></div>
      </div>
    </section>
  );
};
