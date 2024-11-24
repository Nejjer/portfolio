import { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../../../stores/WithStore.tsx';

const VerticalLineWithCircle: FC<{ year: number }> = ({ year }) => {
  return (
    <div className='relative flex w-full items-center justify-center'>
      <div className='absolute h-full w-0.5 bg-dark-blue'></div>
      <div className='bg-ultra-white-blue absolute h-10 w-10 rounded-3xl border-2 border-dark-blue'></div>
      <div className='relative mt-20 bg-white font-bold md:mr-24 md:mt-0'>
        {year}
      </div>
    </div>
  );
};

const WorkExpItem: FC<{ text: string; year: number }> = ({ text, year }) => {
  return (
    <>
      <VerticalLineWithCircle year={year} />
      <p className={'py-4'}>{text}</p>
    </>
  );
};

const WorkExperience: FC = () => {
  const {
    appStore: { mainStore },
  } = useContext<AppStoreContext>(StoreCtx);

  return (
    <section>
      <h4 className={'mb-10 text-3xl font-bold'}>Опыт работы</h4>
      <div className={'grid-cols-work-exp-mobile md:grid-cols-work-exp grid'}>
        {mainStore.workExps
          .slice()
          .sort((a, b) => (a.startDate < b.startDate ? -1 : 1))
          .map((wexp) => (
            <WorkExpItem
              key={wexp.id}
              text={wexp.company}
              year={parseInt(wexp.startDate)}
            />
          ))}
      </div>
    </section>
  );
};

const connected = observer(WorkExperience);
export { connected as WorkExperience };
