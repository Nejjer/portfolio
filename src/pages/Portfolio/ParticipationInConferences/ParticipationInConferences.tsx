import { FC } from 'react';
import { Navigation } from '../../../components/Navigation';

interface IConference {
  title: string;
  info: string;
}

const ConferenceItem = (conference: IConference) => (
  <li className={'bg-white p-3'}>
    <h5 className={'text-xl font-bold'}>{conference.title}</h5>
    <p>{conference.info}</p>
  </li>
);

const conferenceItems: IConference[] = [
  {
    title:
      'Международная научно-методическая конференция «Новые образовательные технологии в ВУЗе»',
    info: 'Екатеринбург (Россия), 2013 г.',
  },
  {
    title: 'Международный научный Арктический Саммит',
    info: 'Краков (Польша), 2013 г.',
  },
  {
    title: 'Международный симпозиум «Жизнь в движении. Освоение Арктики»',
    info: 'Вена (Австрия), 2011 г.',
  },
  {
    title: 'Международный научный Арктический Саммит',
    info: 'Хельсинки (Финляндия), 2014 г.',
  },
  {
    title:
      'XIII Международная конференция «Размышления о науке в “темные” времена»',
    info: 'Бирмингем (Великобритания), 2014 г.',
  },
];

export const ParticipationInConferences: FC = () => {
  return (
    <section className={'relative flex h-[552px] flex-col'}>
      <div className={'p-4'}>
        <Navigation />
      </div>
      <h4 className={'mb-10 mt-9 text-3xl font-bold'}>
        Участие в конференциях
      </h4>
      <ul className={'grid columns-1 gap-0.5 overflow-auto bg-blue'}>
        {conferenceItems.map(({ title, info }) => (
          <ConferenceItem title={title} info={info} />
        ))}
        <div />
      </ul>
    </section>
  );
};
