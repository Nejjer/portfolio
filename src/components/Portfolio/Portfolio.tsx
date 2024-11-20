import { FC } from 'react';
import { Button } from '../Button';
import { PortfolioItem } from '../PortfolioItem';
import { useNavigate } from 'react-router-dom';

export const Portfolio: FC = () => {
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
        <PortfolioItem title={'N научных конференций'} />
        <PortfolioItem title={'Участник X конференций'} />
        <PortfolioItem title={'Прочие достижения'} />
        <PortfolioItem title={'Прочие достижения'} />
      </ul>
    </section>
  );
};
