import { FC, useContext } from 'react';
import { Navigation } from '../Navigation';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';
import { observer } from 'mobx-react';

const Header: FC = () => {
  const {
    appStore: { mainStore },
  } = useContext<AppStoreContext>(StoreCtx);

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
            <h1 className={'mb-2 text-6xl font-bold'}>
              {mainStore.portfolio?.name}
            </h1>
            <p className={'text-right text-3xl'}>
              {mainStore.portfolio?.slogan}
            </p>
          </div>
        </div>
        <div className={'bg-white-blue'}></div>
        <div className={'bg-blue'}></div>
        <div className={'col-span-2 bg-dark-blue'}></div>
      </section>
      <section
        className={
          'header-mobile-gradient flex h-[300px] flex-col items-end justify-end px-6 pb-10 md:hidden'
        }
      >
        <Navigation isAbsolutePos={true} />
        <div>
          <h1 className={'mb-2 text-4xl font-bold'}>
            {mainStore.portfolio?.name}
          </h1>
          <p className={'text-right text-2xl'}>{mainStore.portfolio?.slogan}</p>
        </div>
      </section>
    </>
  );
};

const connected = observer(Header);
export { connected as Header };
