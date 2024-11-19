import { FC } from 'react';
import { Button } from '../Button';
import { PortfolioItem } from '../PortfolioItem';
import { useNavigate } from 'react-router-dom';

export const Portfolio: FC = () => {
  const navigation = useNavigate();

  return (
    <section className={'mb-11'}>
      <div className={'mb-11 flex gap-10'}>
        <h2 className={'text-5xl font-bold'}>Портфолио</h2>
        <Button onClick={() => navigation('aboutme')}>Подробнее</Button>
      </div>
      <ul className={'flex gap-10'}>
        <PortfolioItem title={'N научных конференций'} />
        <PortfolioItem title={'Участник X конференций'} />
        <PortfolioItem title={'Прочие достижения'} />
        <PortfolioItem title={'Прочие достижения'} />
      </ul>
    </section>
  );
};
