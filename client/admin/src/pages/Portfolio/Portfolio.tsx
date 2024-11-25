import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@gravity-ui/uikit';

const Item: FC<{ name: string; path: string }> = ({ name, path }) => {
  return (
    <Link to={path} className={'h-48 basis-48'}>
      <Card
        className={
          'flex h-full w-full items-center justify-center p-2 text-center text-xl shadow'
        }
        type={'action'}
      >
        {name}
      </Card>
    </Link>
  );
};

const sections = [
  { path: 'about', name: 'Обо мне' },
  { path: 'presentation', name: 'Презентацит' },
  { path: 'conferences', name: 'Конференции' },
];

export const Portfolio: FC = () => {
  return (
    <div className={'flex gap-10 p-10'}>
      {sections.map((section) => (
        <Item key={section.path} name={section.name} path={section.path} />
      ))}
    </div>
  );
};
