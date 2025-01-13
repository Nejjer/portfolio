import { FC, useContext } from 'react';
import { AppStoreContext, StoreCtx } from '../../../stores/WithStore.tsx';
import { observer } from 'mobx-react';
import { Pagination } from '../../../components/Pagination';

interface IPublication {
  text: string;
}

const PublicationItem = ({ text }: IPublication) => (
  <li className={'bg-white p-3'}>
    <p>{text}</p>
  </li>
);

const Publications: FC = () => {
  const {
    appStore: { mainStore },
  } = useContext<AppStoreContext>(StoreCtx);

  if (mainStore.publications.length === 0) {
    return null;
  }

  return (
    <section className={'mt-20'}>
      <h4 className={'mb-10 text-3xl font-bold'}>Публикации</h4>
      <Pagination
        countPerPage={5}
        items={mainStore.publications}
        renderItem={({ id, title }) => (
          <PublicationItem key={id} text={title} />
        )}
        className={'flex-[3] md:min-h-[351px]'}
      />
    </section>
  );
};

const connected = observer(Publications);
export { connected as Publications };
