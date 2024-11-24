import { FC, useContext } from 'react';
import { Navigation } from '../../../components/Navigation';
import { AppStoreContext, StoreCtx } from '../../../stores/WithStore.tsx';
import { observer } from 'mobx-react';

const Header: FC = () => {
  const {
    appStore: { mainStore },
  } = useContext<AppStoreContext>(StoreCtx);

  return (
    <section className={'mb-32 flex flex-col'}>
      <div className={'p-4'}>
        <Navigation />
      </div>
      <div className={'mt-9 flex gap-5 md:gap-10'}>
        <div
          className={
            'h-[180px] w-[150px] bg-dark-blue md:h-[400px] md:w-[360px]'
          }
        ></div>
        <div className={'flex flex-grow flex-col'}>
          <p className={'hidden text-xl md:block'}>Обо мне</p>
          <h2 className={'text-2xl font-bold md:text-5xl'}>
            {mainStore.portfolio?.name}
          </h2>
          <div className={'mt-2 h-full md:mt-4 md:bg-grey1 md:p-5'}>
            {mainStore.portfolio?.shortInfo}
          </div>
        </div>
      </div>
    </section>
  );
};

const connected = observer(Header);
export { connected as Header };
