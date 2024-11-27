import { FC, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Form } from 'react-final-form';

import { Card } from '@gravity-ui/uikit';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';
import {
  dynamicConfig,
  DynamicField,
  Spec,
  SpecTypes,
} from '@gravity-ui/dynamic-forms';

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
  { path: 'presentation', name: 'Презентации' },
  { path: 'conferences', name: 'Конференции' },
];

const specs: Spec[] = [
  {
    type: SpecTypes.String,
    viewSpec: {
      type: 'base',
      layout: 'row',
      layoutTitle: 'ФИО',
      placeholder: 'ФИО',
    },
  },
  {
    type: SpecTypes.String,
    viewSpec: {
      type: 'textarea',
      layout: 'row',
      layoutTitle: 'Короткая информация',
      placeholder: 'Короткая информация',
    },
  },
  {
    type: SpecTypes.String,
    viewSpec: {
      type: 'base',
      layout: 'row',
      layoutTitle: 'Слоган',
      placeholder: 'Слоган',
    },
  },
  {
    type: SpecTypes.Object,
    properties: {
      phone: {
        type: SpecTypes.String,
        viewSpec: {
          type: 'base',
          layout: 'row',
          placeholder: 'Телефон',
          layoutTitle: 'Телефон',
        },
      },
      telegram: {
        type: SpecTypes.String,
        pattern: 's*s',
        viewSpec: {
          type: 'base',
          layout: 'row',
          placeholder: 'Telegram',
          layoutTitle: 'Telegram',
        },
      },
      email: {
        type: SpecTypes.String,
        viewSpec: {
          type: 'base',
          layout: 'row',
          placeholder: 'Почта',
          layoutTitle: 'Почта',
        },
      },
    },
    viewSpec: {
      type: 'base',
      layout: 'accordeon',
      layoutTitle: 'Контакты',
      layoutOpen: true,
    },
  },
];

const Portfolio: FC = () => {
  const { id } = useParams();

  const {
    appStore: { mainStore },
  } = useContext<AppStoreContext>(StoreCtx);

  useEffect(() => {
    mainStore.setActivePortfolio(parseInt(id!));
  }, []);

  return (
    <div>
      <div className={'flex gap-10 p-10'}>
        {sections.map((section) => (
          <Item key={section.path} name={section.name} path={section.path} />
        ))}
      </div>
      <Form onSubmit={() => console.log('')}>
        {() =>
          specs.map((spec) => (
            <DynamicField spec={spec} name={'name'} config={dynamicConfig} />
          ))
        }
      </Form>
    </div>
  );
};

const connected = observer(Portfolio);
export { connected as Portfolio };
