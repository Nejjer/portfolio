import { FC, useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';
import { useParams } from 'react-router-dom';
import { DFDialog } from '@gravity-ui/dialog-fields';
import {
  Breadcrumbs,
  Button,
  FirstDisplayedItemsCount,
  LastDisplayedItemsCount,
  useToaster,
} from '@gravity-ui/uikit';
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs.ts';
import { Item } from '../WorkExperience';
import { IPostPublication } from '../../api/api.ts';
import { truncateName } from '../../utils/truncate.ts';

const defaultVal: IPostPublication = {
  title: '',
  description: '',
  portfolioId: 0,
  publicationDate: '',
  publisher: '',
};

const Publications: FC = () => {
  const breadcrumbs = useBreadcrumbs([
    { text: 'Публикации', action: () => null },
  ]);
  const { add } = useToaster();
  const { id } = useParams();
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [initialValues, setInitialValues] =
    useState<IPostPublication>(defaultVal);
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
      <DFDialog<IPostPublication>
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
                  onClick={async () => {
                    await mainStore.deletePublication(editableId);
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
          if (
            Object.keys(form.getState().values).filter(
              // @ts-ignore
              (key) => form.getState().values[key],
            ).length > 0
          ) {
            add({
              title: 'Заполните все поля',
              name: 'validate1',
            });
            return Promise.reject();
          }
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
            type: 'textarea',
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
            type: 'textarea',
            caption: 'Описание',
            required: true,
          },
          {
            name: 'publicationDate',
            type: 'text',
            caption: 'Дата',
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
            text={truncateName(publication.title)}
            key={publication.id}
            onClick={() => {
              setEditableId(publication.id);
              setInitialValues({ ...publication });
              setVisibleDialog(true);
            }}
          />
        ))}
        <Item
          text={'+'}
          onClick={() => {
            setEditableId(null);
            setInitialValues(defaultVal);
            setVisibleDialog(true);
          }}
        />
      </div>
    </div>
  );
};

const connected = observer(Publications);
export { connected as Publications };
