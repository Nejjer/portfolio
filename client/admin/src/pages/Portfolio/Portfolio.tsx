import { FC, useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
  { path: 'presentations', name: 'Презентации' },
  { path: 'educations', name: 'Образование' },
  { path: 'conferences', name: 'Конференции' },
  { path: 'publications', name: 'Публикации' },
  { path: 'workExperience', name: 'Опыт работы' },
];

const Portfolio: FC = () => {
  const { id } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();
  const {
    appStore: { mainStore },
  } = useContext<AppStoreContext>(StoreCtx);

  useEffect(() => {
    if (!isNew) {
      mainStore.setActivePortfolio(parseInt(id!));
    }
  }, []);

  if (!mainStore.getActivePortfolio() && !isNew) {
    return;
  }

  return (
    <div className={'flex flex-col gap-20 p-10'}>
      <div>
        <h2 className={'mb-10 text-2xl'}>Общая информация</h2>
        <Form
          onSubmit={async (values: IPortfolioDTO) => {
            if (isNew) {
              await mainStore.createPortfolio(values);
              navigate('/');
            } else {
              mainStore.submitPortfolio(values);
            }
          }}
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
                {isNew ? 'Создать' : 'Обновить'}
              </Button>
            </>
          )}
        </Form>
      </div>
      {!isNew && (
        <>
          <h2 className={'text-2xl'}>Другие разделы</h2>
          <div className={'flex gap-10'}>
            {sections.map((section) => (
              <Item
                key={section.path}
                name={section.name}
                path={section.path}
              />
            ))}
          </div>
          <Button
            onClick={() =>
              window.open('http://localhost:5174/web-web/autoSave')
            }
          >
            Экспортировать страницу как pdf
          </Button>
        </>
      )}
    </div>
  );
};

const connected = observer(Portfolio);
export { connected as Portfolio };
