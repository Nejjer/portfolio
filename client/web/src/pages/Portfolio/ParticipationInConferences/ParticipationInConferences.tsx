import { FC, useContext, useState } from 'react';
import { AppStoreContext, StoreCtx } from '../../../stores/WithStore.tsx';
import { IConference } from '../../../api/api.ts';
import { observer } from 'mobx-react';
import { Navigation } from '../../../components/Navigation';

const ConferenceItem: FC<{
  conference: IConference;
  onClick: () => void;
  active: boolean;
}> = ({ conference, onClick, active }) => {
  return (
    <li
      onClick={onClick}
      className={`flex cursor-pointer gap-3 px-3 py-2 text-base text-gray-800 ${active ? 'bg-ultra-white-blue font-semibold' : 'bg-white'}`}
    >
      {conference.name}
    </li>
  );
};

const ParticipationInConferences: FC = () => {
  const {
    appStore: { mainStore },
  } = useContext<AppStoreContext>(StoreCtx);

  const [active, setActive] = useState(0);

  if (!mainStore.conferences.length) {
    return null;
  }

  return (
    <section className={'!px-[60px]'}>
      <div className={'py-4'}>
        <Navigation />
      </div>
      <h4 className={'mb-4 mt-8 text-3xl font-bold'}>Участие в конференциях</h4>
      <div className='flex h-[600px] flex-col-reverse gap-6 md:h-[300px] md:flex-row'>
        <div className='relative flex-[2] overflow-hidden'>
          <img
            src={mainStore.conferences[active].image}
            alt='Example'
            className='absolute inset-0 h-full w-full object-contain object-center'
          />
        </div>

        <div className='flex-[3] overflow-auto'>
          <ul className={'grid columns-1 gap-0.5  bg-ultra-white-blue'}>
            {mainStore.conferences.map((pres, index) => (
              <ConferenceItem
                key={pres.id}
                conference={pres}
                onClick={() => setActive(index)}
                active={index === active}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const connected = observer(ParticipationInConferences);
export { connected as ParticipationInConferences };
