import { FC, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Form } from 'react-final-form';

import { Button, Card } from '@gravity-ui/uikit';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';
import { dynamicConfig, DynamicField } from '@gravity-ui/dynamic-forms';
import { IPortfolioDTO } from '../../api/api.ts';
import { specs } from './formSpec.ts';

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
  { path: 'workExperience', name: 'Опыт работы' },
  { path: 'education', name: 'Образование' },
];

const Portfolio: FC = () => {
  const { id } = useParams();

  const {
    appStore: { mainStore },
  } = useContext<AppStoreContext>(StoreCtx);

  useEffect(() => {
    mainStore.setActivePortfolio(parseInt(id!));
  }, []);

  if (!mainStore.getActivePortfolio()) {
    return;
  }

  return (
    <div className={'flex flex-col gap-20 p-10'}>
      <div>
        <h2 className={'mb-10 text-2xl'}>Общая информация</h2>
        <Form
          onSubmit={(values: IPortfolioDTO) =>
            mainStore.submitPortfolio(values)
          }
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
              <Button
                onClick={form.handleSubmit}
                className={'mt-10'}
                loading={mainStore.isLoading === 'SubmitPortfolio'}
              >
                Отправить
              </Button>
            </>
          )}
        </Form>
      </div>
      <h2 className={'text-2xl'}>Другие разделы</h2>
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
