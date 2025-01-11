import { FC, useContext, useState } from 'react';
import {
  dynamicConfig,
  DynamicField,
  SpecTypes,
} from '@gravity-ui/dynamic-forms';
import { IMySpec } from '../Presentations/formSpec.ts';
import { Form } from 'react-final-form';
import { Button, Card } from '@gravity-ui/uikit';
import { authApi, IAuthParam } from '../../api/authApi.ts';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';
import { Link, useNavigate } from 'react-router-dom';

const specs: IMySpec[] = [
  {
    type: SpecTypes.String,
    viewSpec: {
      type: 'base',
      layout: 'row',
      layoutTitle: 'Логин',
      placeholder: 'example@example.com',
    },
    name: 'email',
  },
  {
    type: SpecTypes.String,
    viewSpec: {
      type: 'password',
      layout: 'row',
      layoutTitle: 'Пароль',
    },
    name: 'password',
  },
];

export const Registration: FC = () => {
  const {
    appStore: { mainStore },
  } = useContext<AppStoreContext>(StoreCtx);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const handleSubmit = async (values: IAuthParam) => {
    try {
      setError('');
      setLoading(true);
      await authApi.register(values);
      setLoading(false);
      mainStore.update('MainLoading');
      navigate('/');
    } catch (e) {
      console.error(e);
      setError('Не удалось зарегистрироваться');
      setLoading(false);
    }
  };

  return (
    <div className={'container flex h-full items-center justify-center'}>
      <Card view={'filled'} className={'p-6'}>
        <h1 className={'mb-5 text-center text-2xl'}>Регистрация</h1>
        <Form onSubmit={(values) => handleSubmit(values as IAuthParam)}>
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
                className={'mt-10 w-full'}
                loading={loading}
              >
                Зарегистрироваться
              </Button>
              <div className={'mt-1 text-center'}>{error}</div>
            </>
          )}
        </Form>
        <p className={'mt-2 text-center'}>
          <Link to={'/auth'}>Войти</Link>
        </p>
      </Card>
    </div>
  );
};
