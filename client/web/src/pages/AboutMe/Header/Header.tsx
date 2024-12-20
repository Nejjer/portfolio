import { FC, useContext } from 'react';
import { Navigation } from '../../../components/Navigation';
import { AppStoreContext, StoreCtx } from '../../../stores/WithStore.tsx';
import { observer } from 'mobx-react';

const Header: FC = () => {
  const {
    appStore: { mainStore },
  } = useContext<AppStoreContext>(StoreCtx);

  return (
    <section className={'mb-16 flex flex-col md:!px-[60px]'}>
      <div className={'py-4'}>
        <Navigation />
      </div>
      <div className={'mt-9 flex gap-5 md:gap-10'}>
        <div
          className={
            'h-[180px] w-[150px] basis-1/3 bg-dark-blue md:h-[400px] md:w-[360px]'
          }
        ></div>
        <div className={'flex basis-2/3 flex-col'}>
          <p className={'hidden text-xl md:block'}>Обо мне</p>
          <h2 className={'text-2xl font-bold md:text-5xl'}>
            {mainStore.portfolio?.name}
          </h2>
          <div className={'mt-2'}>
            {mainStore.portfolio?.credits.join(', ')}
          </div>
          <div
            className={'mt-2 hidden h-full md:mt-4 md:block md:bg-grey1 md:p-5'}
          >
            {mainStore.portfolio?.shortInfo}
          </div>
        </div>
      </div>
      <div className={'mt-10 h-full md:mt-4 md:hidden'}>
        {mainStore.portfolio?.shortInfo}
      </div>
    </section>
  );
};

const connected = observer(Header);
export { connected as Header };
