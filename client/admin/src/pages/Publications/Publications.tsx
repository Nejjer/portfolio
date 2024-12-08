import { FC, useContext, useEffect, useState } from 'react';
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs.ts';
import { useParams } from 'react-router-dom';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';
import {
  Breadcrumbs,
  Button,
  Card,
  FirstDisplayedItemsCount,
  LastDisplayedItemsCount,
} from '@gravity-ui/uikit';
import { DFDialog } from '@gravity-ui/dialog-fields';
import { observer } from 'mobx-react';

const Item: FC<{ text: string; onClick: () => void }> = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className={'h-48 basis-48'}>
      <Card
        className={
          'flex h-full w-full items-center justify-center p-2 text-center text-xl shadow'
        }
        type={'action'}
      >
        {text}
      </Card>
    </button>
  );
};

interface FormValues {
  title: string;
  publisher: string;
  publicationDate: string;
  description: string;
}

const defaultFormValues: FormValues = {
  title: '',
  publisher: '',
  publicationDate: '',
  description: '',
};

const Publications: FC = () => {
  const breadcrumbs = useBreadcrumbs([
    { text: 'Публикации', action: () => null },
  ]);
  const { id } = useParams();
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [initialValues, setInitialValues] = useState(defaultFormValues);
  const [editableId, setEditableId] = useState<number | null>(null);
  const {
    appStore: { mainStore },
  } = useContext<AppStoreContext>(StoreCtx);

  useEffect(() => {
    mainStore.setActivePortfolio(parseInt(id!));
    mainStore.updatePublications();
  }, []);

  if (!mainStore.getActivePortfolio()) {
    return;
  }

  return (
    <div>
      <Breadcrumbs
        className={'mt-2'}
        items={breadcrumbs}
        firstDisplayedItemsCount={FirstDisplayedItemsCount.One}
        lastDisplayedItemsCount={LastDisplayedItemsCount.One}
      />
      <h2 className={'mb-10 mt-10 text-2xl'}>Публикации</h2>
      <DFDialog<FormValues>
        visible={visibleDialog}
        footerProps={{
          propsButtonApply: {
            loading: mainStore.isLoading === 'SubmitPublication',
          },
          textApply: editableId ? 'Изменить' : 'Добавить',
          textCancel: 'Отменить',
          content: (
            <div>
              {editableId && (
                <Button
                  loading={mainStore.isLoading === 'SubmitPublication'}
                  view={'outlined-danger'}
                  onClick={() => {
                    mainStore.deletePublication(editableId);
                    setVisibleDialog(false);
                  }}
                >
                  Удалить
                </Button>
              )}
            </div>
          ),
        }}
        headerProps={{
          title: 'Публикация',
        }}
        onAdd={async (form) => {
          if (editableId) {
            await mainStore.putPublication({
              ...form.getState().values,
              portfolioId: parseInt(id!),
              id: editableId,
            });
          } else {
            await mainStore.postPublication({
              ...form.getState().values,
              portfolioId: parseInt(id!),
            });
          }
          setVisibleDialog(false);
        }}
        initialValues={initialValues}
        onClose={() => setVisibleDialog(false)}
        fields={[
          {
            name: 'title',
            type: 'text',
            caption: 'Название',
            required: true,
          },
          {
            name: 'publisher',
            type: 'text',
            caption: 'Автор',
            required: true,
          },
          {
            name: 'description',
            type: 'text',
            caption: 'Описание',
            required: true,
          },
          {
            name: 'publicationDate',
            type: 'text',
            caption: 'Дата публикации',
            required: true,
            validator: (value) => {
              return /[0-9]/.test(value) ? '' : 'Введите число';
            },
          },
        ]}
      />
      <div className={'flex flex-wrap gap-10'}>
        {mainStore.publications.map((publication) => (
          <Item
            text={
              publication.title.length > 15
                ? `${publication.title.slice(0, 15)}...`
                : publication.title
            }
            key={publication.id}
            onClick={() => {
              setEditableId(publication.id);
              setInitialValues({
                ...publication,
              });
              setVisibleDialog(true);
            }}
          />
        ))}
        <Item
          text={'+'}
          onClick={() => {
            setEditableId(null);
            setInitialValues(defaultFormValues);
            setVisibleDialog(true);
          }}
        />
      </div>
    </div>
  );
};

const connected = observer(Publications);
export { connected as Publications };
