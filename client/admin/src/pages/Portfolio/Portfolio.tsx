import { FC, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Form } from 'react-final-form';

import { Button, Card } from '@gravity-ui/uikit';
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

type IMySpec = Spec & {
  name: string;
};

const specs: IMySpec[] = [
  {
    type: SpecTypes.String,
    viewSpec: {
      type: 'base',
      layout: 'row',
      layoutTitle: 'ФИО',
      placeholder: 'ФИО',
    },
    name: 'name',
  },
  {
    type: SpecTypes.String,
    viewSpec: {
      type: 'textarea',
      layout: 'row',
      layoutTitle: 'Короткая информация',
      placeholder: 'Короткая информация',
    },
    name: 'shortInfo',
  },
  {
    type: SpecTypes.String,
    viewSpec: {
      type: 'base',
      layout: 'row',
      layoutTitle: 'Слоган',
      placeholder: 'Слоган',
    },
    name: 'slogan',
  },
  {
    type: SpecTypes.String,
    viewSpec: {
      type: 'base',
      layout: 'row',
      layoutTitle: 'Заслуги',
      placeholder: 'Заслуги',
    },
    name: 'credits',
  },
  {
    type: SpecTypes.Object,
    name: 'contacts',
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

  console.log(JSON.stringify(mainStore.getActivePortfolio()));

  if (!mainStore.getActivePortfolio()) {
    return;
  }

  return (
    <div className={'flex flex-col gap-20 p-10'}>
      <div>
        <h2 className={'mb-10 text-2xl'}>Общая информация</h2>
        <Form
          onSubmit={(values) => console.log(values)}
          initialValues={mainStore.getActivePortfolio()}
        >
          {(form) => (
            <>
              {specs.map((spec) => (
                <DynamicField
                  key={spec.name}
                  spec={spec}
                  name={spec.name}
                  config={dynamicConfig}
                />
              ))}
              <Button onClick={form.handleSubmit} className={'mt-10'}>
                Отправить
              </Button>
            </>
          )}
        </Form>
      </div>
      <div className={'flex gap-10'}>
        {sections.map((section) => (
          <Item key={section.path} name={section.name} path={section.path} />
        ))}
      </div>
    </div>
  );
};

const connected = observer(Portfolio);
export { connected as Portfolio };
