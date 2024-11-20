import { FC } from 'react';

export const AboutMe: FC = () => {
  return (
    <section
      className={'mb-14 mt-8 flex w-full gap-5 md:mb-32 md:mt-32 md:gap-10'}
    >
      <div className={'h-40 basis-2/5 bg-dark-blue md:h-[400px]'}></div>
      <div className={'flex flex-grow flex-col'}>
        <p className={'hidden text-xl md:visible'}>Меня зовут</p>
        <h2 className={'text-lg font-bold md:text-5xl'}>Малыгина Наталья</h2>
        <p className={'text-xs md:mt-4 md:text-2xl'}>
          автор N научных публикаций, участник M конференций, etc
        </p>

        <div className={'mt-4 h-full bg-grey1'}></div>
      </div>
    </section>
  );
};
