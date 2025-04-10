import { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';

const AboutMe: FC = () => {
  const {
    appStore: { mainStore },
  } = useContext<AppStoreContext>(StoreCtx);

  return (
    <section
      className={'mb-14 mt-8 flex w-full gap-5 md:mb-32 md:mt-32 md:gap-10'}
    >
      <div className={'h-40  basis-1/3 bg-dark-blue md:h-[400px]'}></div>
      <div className={'flex basis-2/3 flex-col'}>
        <p className={'hidden text-xl md:visible'}>Меня зовут</p>
        <h2 className={'text-lg font-bold md:text-5xl'}>
          {mainStore.portfolio?.name}
        </h2>
        <p className={'text-xs md:mt-4 md:text-xl'}>
          {mainStore.portfolio?.credits.join(', ')}
        </p>

        <div className={'mt-4 h-full bg-grey5 p-2 text-greytext md:text-2xl'}>
          {mainStore.portfolio?.shortInfo}
        </div>
      </div>
    </section>
  );
};

const connected = observer(AboutMe);
export { connected as AboutMe };
