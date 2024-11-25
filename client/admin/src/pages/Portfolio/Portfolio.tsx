import { FC, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '@gravity-ui/uikit';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';

const Item: FC<{ name: string; path: string }> = ({ name, path }) => {
  return (
    <Link to={path} className={'h-48 basis-48'}>
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

const sections = [
  { path: 'about', name: 'Обо мне' },
  { path: 'presentation', name: 'Презентации' },
  { path: 'conferences', name: 'Конференции' },
];

const Portfolio: FC = () => {
  const { id } = useParams();

  const {
    appStore: { mainStore },
  } = useContext<AppStoreContext>(StoreCtx);

  useEffect(() => {
    mainStore.setActivePortfolio(parseInt(id!));
  }, []);

  return (
    <div className={'flex gap-10 p-10'}>
      {sections.map((section) => (
        <Item key={section.path} name={section.name} path={section.path} />
      ))}
    </div>
  );
};

const connected = observer(Portfolio);
export { connected as Portfolio };
