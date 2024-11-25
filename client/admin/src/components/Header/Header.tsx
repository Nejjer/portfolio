import { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';

const Header: FC = () => {
  const {
    appStore: { mainStore },
  } = useContext<AppStoreContext>(StoreCtx);

  return (
    <div
      className={
        'bg-g-color-base-float flex h-16 w-full items-center justify-start p-4 text-xl'
      }
    >
      {mainStore.getActivePortfolio()?.name}
    </div>
  );
};

const connected = observer(Header);
export { connected as Header };
