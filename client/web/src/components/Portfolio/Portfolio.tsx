import { FC, useContext } from 'react';
import { Button } from '../Button';
import { PortfolioItem } from '../PortfolioItem';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';
import { pluralize } from '../../utils/pluralize.ts';

const Portfolio: FC = () => {
  const {
    appStore: { mainStore },
  } = useContext<AppStoreContext>(StoreCtx);

  const navigation = useNavigate();

  return (
    <section className={'mb-11'}>
      <div className={'mb-2.5 flex items-center gap-2 md:mb-11 md:gap-10'}>
        <h2 className={'text-lg font-bold md:text-5xl'}>Портфолио</h2>
        <Button
          onClick={() => navigation('aboutme')}
          className={'hidden md:flex'}
        >
          Подробнее
        </Button>
        <Button
          onClick={() => navigation('aboutme')}
          minimized
          className={'flex md:hidden'}
        ></Button>
      </div>
      <ul
        className={'flex flex-col gap-5 overflow-x-auto md:flex-row md:gap-10'}
      >
        <PortfolioItem
          title={`${pluralize(mainStore.conferences.length, ['научная конференция', 'научные конференции', 'научных конференций'])}`}
        />
        <PortfolioItem
          title={`Автор ${pluralize(mainStore.publications.length, ['публикации', 'публикаций', 'публикаций'])}`}
        />
        <PortfolioItem
          title={`Более ${pluralize(mainStore.getYearsOfWorkExp(), ['года', 'лет', 'лет'])} опыта работы`}
        />
        <PortfolioItem title={'Прочие достижения'} />
      </ul>
    </section>
  );
};

const connected = observer(Portfolio);
export { connected as Portfolio };
