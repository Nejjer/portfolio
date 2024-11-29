import { FC, useContext } from 'react';
import { IPresentation } from '../../../api/api.ts';

const PresentationItem: FC<{ presentation: IPresentation }> = ({
  presentation,
}) => {
  return (
    <li>
      <a href={presentation.link} target={'_blank'}>
        <img
          src={presentation.image}
          alt={presentation.title}
          className='max-w-40 object-cover'
        />
        <div className='p-4'>
          <h3 className='text-lg font-bold text-gray-800'>
            {presentation.title}
          </h3>
        </div>
      </a>
    </li>
  );
};

const Presentations: FC = () => {
  const {
    appStore: { mainStore },
  } = useContext<AppStoreContext>(StoreCtx);

  return (
    <section className={'mt-20 h-[351px]'}>
      <h4 className={'mb-10 text-3xl font-bold'}>Презентации</h4>

      <ul className={'flex gap-5'}>
        {mainStore.presentations.map((pres) => (
          <PresentationItem key={pres.id} presentation={pres} />
        ))}
      </ul>
    </section>
  );
};

import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../../../stores/WithStore.tsx';

const connected = observer(Presentations);
export { connected as Presentations };
