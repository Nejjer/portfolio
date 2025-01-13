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
import { api, IPostPresentation } from '../../api/api.ts';
import { specs } from './formSpec.ts';
import { dynamicConfig, DynamicField } from '@gravity-ui/dynamic-forms';
import { truncateName } from '../../utils/truncate.ts';

const defaultVal: IPostPresentation = {
  image: '',
  link: '',
  portfolioId: 0,
  description: '',
  title: '',
};

const Presentations: FC = () => {
  const breadcrumbs = useBreadcrumbs([
    { text: 'Презентации', action: () => null },
  ]);
  const [fileUrl, setFileUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const { id } = useParams();
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [initialValues, setInitialValues] =
    useState<IPostPresentation>(defaultVal);
  const [editableId, setEditableId] = useState<number | null>(null);
  const {
    appStore: { mainStore },
  } = useContext<AppStoreContext>(StoreCtx);

  useEffect(() => {
    mainStore.setActivePortfolio(parseInt(id!));
    mainStore.updatePresentations();
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

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    mainStore.setIsLoading('SubmitFile');
    try {
      // Предполагаем, что axios уже настроен для отправки на нужный endpoint
      const response = await api.uploadFile(formData);

      setImageUrl(response.url);
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
      <Overlay visible={mainStore.isLoading === 'UpdatePresentation'}>
        <Loader />
      </Overlay>
      <Breadcrumbs
        className={'mt-2'}
        items={breadcrumbs}
        firstDisplayedItemsCount={FirstDisplayedItemsCount.One}
        lastDisplayedItemsCount={LastDisplayedItemsCount.One}
      />
      <h2 className={'mb-10 mt-10 text-2xl'}>Презентации</h2>
      <Dialog open={visibleDialog} onClose={() => setVisibleDialog(false)}>
        <Form
          initialValues={initialValues}
          onSubmit={async (values: IPostPresentation) => {
            if (editableId) {
              await mainStore.putPresentation({
                ...values,
                portfolioId: parseInt(id!),
                id: editableId,
                image: imageUrl,
                link: fileUrl,
              });
            } else {
              await mainStore.postPresentation({
                ...values,
                portfolioId: parseInt(id!),
                image: imageUrl,
                link: fileUrl,
              });
            }
            setFileUrl('');
            setImageUrl('');
            setVisibleDialog(false);
          }}
        >
          {(form) => (
            <>
              <Dialog.Header caption='Caption' />
              <Dialog.Body>
                <div>
                  <p>Файл презентации</p>
                  <input
                    type={'file'}
                    accept='.pdf,.pptx,.ppt'
                    onChange={handleFileChange}
                    className='mb-10'
                  />
                </div>
                <div>
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      className={'max-h-20'}
                      alt={'Картинка'}
                    />
                  )}
                  <p>Обложка презентации</p>
                  <input
                    type={'file'}
                    accept={'image/*'}
                    onChange={handleImageChange}
                    className='mb-10'
                  />
                </div>

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
                propsButtonApply={{
                  disabled: !form.valid || !form.dirty || !fileUrl || !imageUrl,
                }}
                children={
                  <div>
                    {editableId && (
                      <Button
                        loading={mainStore.isLoading === 'SubmitPresentation'}
                        view={'outlined-danger'}
                        onClick={async () => {
                          await mainStore.deletePresentation(editableId);
                          setFileUrl('');
                          setImageUrl('');
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
        {mainStore.presentations.map((pres) => (
          <Item
            text={truncateName(pres.title)}
            key={pres.id}
            onClick={() => {
              setEditableId(pres.id);
              setInitialValues(pres);
              setFileUrl(pres.link);
              setImageUrl(pres.image);
              setVisibleDialog(true);
            }}
          />
        ))}
        <Item
          text={'+'}
          onClick={() => {
            setEditableId(null);
            setInitialValues(defaultVal);
            setFileUrl('');
            setImageUrl('');
            setVisibleDialog(true);
          }}
        />
      </div>
    </div>
  );
};

const connected = observer(Presentations);
export { connected as Presentations };
