import { FC, useContext, useState } from 'react';
import { IPresentation } from '../../../api/api.ts';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../../../stores/WithStore.tsx';

import DownloadIcon from './iconoir_download.svg?react';

const PresentationItem: FC<{
  presentation: IPresentation;
  onClick: () => void;
  active: boolean;
}> = ({ presentation, onClick, active }) => {
  return (
    <li
      onClick={onClick}
      className={`flex cursor-pointer gap-3 px-3 py-2 text-base text-gray-800 ${active ? 'bg-ultra-white-blue font-semibold' : 'bg-white'}`}
    >
      {active && (
        <a
          href={presentation.link}
          target={'_blank'}
          className={'flex w-8 basis-8 items-center justify-center'}
        >
          <DownloadIcon />
        </a>
      )}
      {presentation.title}
    </li>
  );
};

const Presentations: FC = () => {
  const {
    appStore: { mainStore },
  } = useContext<AppStoreContext>(StoreCtx);

  const [active, setActive] = useState(0);

  if (!mainStore.presentations.length) {
    return null;
  }

  return (
    <section className={'mb-20 mt-20'}>
      <h4 className={'mb-4 text-3xl font-bold'}>Презентации</h4>
      <div className='flex h-[600px] flex-col-reverse gap-6 md:h-[300px] md:flex-row'>
        <div className='relative flex-[2] overflow-hidden'>
          <a href={mainStore.presentations[active].link} target={'_blank'}>
            <img
              src={mainStore.presentations[active].image}
              alt='Example'
              className='absolute inset-0 h-full w-full object-contain object-center'
            />
          </a>
        </div>

        <div className='flex-[3] overflow-auto'>
          <ul className={'grid columns-1 gap-0.5  bg-ultra-white-blue'}>
            {mainStore.presentations.map((pres, index) => (
              <PresentationItem
                key={pres.id}
                presentation={pres}
                onClick={() => setActive(index)}
                active={index === active}
              />
            ))}
          </ul>
        </div>
      </div>
      {/*spacer*/}
      <div className={'mt-10'}></div>
    </section>
  );
};

const connected = observer(Presentations);
export { connected as Presentations };
