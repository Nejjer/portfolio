import { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs.ts';
import { useParams } from 'react-router-dom';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';
import {
  Breadcrumbs,
  Button,
  Dialog,
  FirstDisplayedItemsCount,
  LastDisplayedItemsCount,
  Loader,
  Overlay,
} from '@gravity-ui/uikit';
import { Item } from '../WorkExperience';
import { Form } from 'react-final-form';
import { api, IPostConference } from '../../api/api.ts';
import { specs } from './formSpec.ts';
import { dynamicConfig, DynamicField } from '@gravity-ui/dynamic-forms';
import { truncateName } from '../../utils/truncate.ts';

const Conferences: FC = () => {
  const breadcrumbs = useBreadcrumbs([
    { text: 'Конференции', action: () => null },
  ]);
  const [fileUrl, setFileUrl] = useState('');
  const { id } = useParams();
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [initialValues, setInitialValues] = useState<IPostConference>({
    date: '',
    name: '',
    image: '',
    portfolioId: 0,
  });
  const [editableId, setEditableId] = useState<number | null>(null);
  const {
    appStore: { mainStore },
  } = useContext<AppStoreContext>(StoreCtx);

  useEffect(() => {
    mainStore.setActivePortfolio(parseInt(id!));
    mainStore.updateConferences();
  }, []);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    mainStore.setIsLoading('SubmitFile');
    try {
      // Предполагаем, что axios уже настроен для отправки на нужный endpoint
      const response = await api.uploadFile(formData);

      setFileUrl(response.url);
    } catch (err) {
      console.error('Ошибка при загрузке файла:', err);
    }
    mainStore.setIsLoading('None');
  };

  if (!mainStore.getActivePortfolio()) {
    return;
  }

  return (
    <div className='relative'>
      <Overlay visible={mainStore.isLoading === 'UpdateConference'}>
        <Loader />
      </Overlay>
      <Breadcrumbs
        className={'mt-2'}
        items={breadcrumbs}
        firstDisplayedItemsCount={FirstDisplayedItemsCount.One}
        lastDisplayedItemsCount={LastDisplayedItemsCount.One}
      />
      <h2 className={'mb-10 mt-10 text-2xl'}>Конференции</h2>
      <Dialog open={visibleDialog} onClose={() => setVisibleDialog(false)}>
        <Form
          initialValues={initialValues}
          onSubmit={async (values: IPostConference) => {
            if (editableId) {
              await mainStore.putConference({
                ...values,
                portfolioId: parseInt(id!),
                id: editableId,
                image: fileUrl,
              });
            } else {
              await mainStore.postConference({
                ...values,
                portfolioId: parseInt(id!),
                image: fileUrl,
              });
            }
            setFileUrl('');
            setVisibleDialog(false);
          }}
        >
          {(form) => (
            <>
              <Dialog.Header caption='Caption' />
              <Dialog.Body>
                {fileUrl && <img src={fileUrl} alt={'Картинка'} />}
                <input
                  type={'file'}
                  accept={'image/*'}
                  onChange={handleFileChange}
                  className='mb-10'
                />
                {specs.map((spec) => (
                  <DynamicField
                    key={spec.name}
                    spec={spec}
                    name={spec.name}
                    config={dynamicConfig}
                  />
                ))}
              </Dialog.Body>
              <Dialog.Footer
                onClickButtonCancel={() => setVisibleDialog(false)}
                onClickButtonApply={form.handleSubmit}
                textButtonApply={editableId ? 'Изменить' : 'Добавить'}
                textButtonCancel='Отменить'
                children={
                  <div>
                    {editableId && (
                      <Button
                        loading={mainStore.isLoading === 'SubmitConference'}
                        view={'outlined-danger'}
                        onClick={async () => {
                          await mainStore.deleteConference(editableId);
                          setFileUrl('');
                          setVisibleDialog(false);
                        }}
                      >
                        Удалить
                      </Button>
                    )}
                  </div>
                }
              />
            </>
          )}
        </Form>
        <Overlay visible={mainStore.isLoading === 'SubmitFile'}>
          <Loader />
        </Overlay>
      </Dialog>
      <div className={'flex flex-wrap gap-10'}>
        {mainStore.conferences.map((conf) => (
          <Item
            text={truncateName(conf.name)}
            key={conf.id}
            onClick={() => {
              setEditableId(conf.id);
              setInitialValues({
                name: conf.name.trim(),
                date: conf.date,
                image: conf.image,
                portfolioId: conf.portfolioId,
              });
              setFileUrl(conf.image);
              setVisibleDialog(true);
            }}
          />
        ))}
        <Item
          text={'+'}
          onClick={() => {
            setEditableId(null);
            setInitialValues({
              name: '',
              date: '',
              image: '',
              portfolioId: 0,
            });
            setFileUrl('');
            setVisibleDialog(true);
          }}
        />
      </div>
    </div>
  );
};

const connected = observer(Conferences);
export { connected as Conferences };
