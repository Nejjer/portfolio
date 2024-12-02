import { FC, useContext } from 'react';
import { AppStoreContext, StoreCtx } from '../../../stores/WithStore.tsx';
import { observer } from 'mobx-react';

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

  return (
    <section className={'mt-20 h-[351px]'}>
      <h4 className={'mb-10 text-3xl font-bold'}>Публикации</h4>
      <ul className={'grid columns-1 gap-0.5 bg-ultra-white-blue'}>
        {mainStore.publications.map(({ id, title }) => (
          <PublicationItem key={id} text={title} />
        ))}
      </ul>
    </section>
  );
};

const connected = observer(Publications);
export { connected as Publications };
