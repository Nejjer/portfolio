import { FC, useContext } from 'react';
import { Card, Loader } from '@gravity-ui/uikit';
import { ID } from '../../api/axiosInstance.ts';
import { Link } from 'react-router-dom';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';

const PortfolioItem: FC<{ name: string; id: ID }> = ({ name, id }) => {
  const {
    appStore: { mainStore },
  } = useContext<AppStoreContext>(StoreCtx);

  return (
    <Link
      to={id.toString()}
      onClick={() => mainStore.setActivePortfolio(id)}
      className={'h-48 basis-48'}
    >
      <Card
        className={
          'flex h-full w-full items-center justify-center p-2 text-center text-xl shadow'
        }
        type={'action'}
      >
        {name}
      </Card>
    </Link>
  );
};

export const PortfolioList: FC = () => {
  const {
    appStore: { mainStore },
  } = useContext<AppStoreContext>(StoreCtx);

  if (mainStore.isLoading) {
    return (
      <div className={'mt-40 flex justify-center'}>
        <Loader size={'l'} />
      </div>
    );
  }

  return (
    <div className={'flex gap-10 p-10'}>
      {mainStore.portfolios.map((portfolio) => (
        <PortfolioItem
          key={portfolio.id}
          name={portfolio.name}
          id={portfolio.id}
        />
      ))}
    </div>
  );
};
