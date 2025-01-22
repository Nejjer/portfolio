import { FC, useContext, useState } from 'react';
import { AppStoreContext, StoreCtx } from '../../../stores/WithStore.tsx';
import { IConference } from '../../../api/api.ts';
import { observer } from 'mobx-react';
import { Navigation } from '../../../components/Navigation';
import { Pagination } from '../../../components/Pagination';

const ConferenceItem: FC<{
  conference: IConference;
  onClick: () => void;
  active: boolean;
}> = ({ conference, onClick, active }) => {
  return (
    <li
      onClick={onClick}
      className={`flex cursor-pointer gap-3 px-3 py-2 text-base text-gray-800 ${active ? 'bg-ultra-white-blue' : 'bg-white'}`}
    >
      {conference.name}
    </li>
  );
};

interface Props {
  hideNav?: boolean;
}

const ParticipationInConferences: FC<Props> = ({ hideNav }) => {
  const {
    appStore: { mainStore },
  } = useContext<AppStoreContext>(StoreCtx);

  const [active, setActive] = useState(0);

  if (!mainStore.conferences.length) {
    return null;
  }

  return (
    <section className={'md:!px-[60px]'}>
      {!hideNav && (
        <div className={'py-4'}>
          <Navigation />
        </div>
      )}
      <h4 className={'mb-4 mt-8 text-3xl font-bold'}>Участие в конференциях</h4>
      <div className='flex min-h-[600px] flex-col-reverse gap-6 md:min-h-[300px] md:flex-row'>
        <div className='relative flex-[2] overflow-hidden'>
          <img
            src={mainStore.conferences[active].image}
            alt='Example'
            className='absolute inset-0 h-full w-full object-contain object-center'
          />
        </div>
        <Pagination
          countPerPage={4}
          items={mainStore.conferences}
          renderItem={(pres, index) => (
            <ConferenceItem
              key={pres.id}
              conference={pres}
              onClick={() => setActive(index)}
              active={index === active}
            />
          )}
          className={'flex-[3] md:min-h-[300px]'}
        />
      </div>
    </section>
  );
};

const connected = observer(ParticipationInConferences);
export { connected as ParticipationInConferences };
