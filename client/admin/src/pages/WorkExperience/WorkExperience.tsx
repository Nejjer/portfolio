import { FC, useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';
import { useParams } from 'react-router-dom';
import { DFDialog } from '@gravity-ui/dialog-fields';
import {
  Breadcrumbs,
  Button,
  Card,
  FirstDisplayedItemsCount,
  LastDisplayedItemsCount,
} from '@gravity-ui/uikit';
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs.ts';

interface FormValues {
  description: string;
  startDate: string;
}

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

const WorkExperience: FC = () => {
  const breadcrumbs = useBreadcrumbs([
    { text: 'Опыт работы', action: () => null },
  ]);
  const { id } = useParams();
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [initialValues, setInitialValues] = useState({
    description: '',
    startDate: '',
  });
  const [editableId, setEditableId] = useState<number | null>(null);
  const {
    appStore: { mainStore },
  } = useContext<AppStoreContext>(StoreCtx);

  useEffect(() => {
    mainStore.setActivePortfolio(parseInt(id!));
    mainStore.updateWorkExps();
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
      <h2 className={'mb-10 mt-10 text-2xl'}>Опыт работы</h2>
      <DFDialog<FormValues>
        visible={visibleDialog}
        footerProps={{
          propsButtonApply: {
            loading: mainStore.isLoading === 'SubmitWorkExperience',
          },
          textApply: editableId ? 'Изменить' : 'Добавить',
          textCancel: 'Отменить',
          content: (
            <div>
              {editableId && (
                <Button
                  loading={mainStore.isLoading === 'SubmitWorkExperience'}
                  view={'outlined-danger'}
                  onClick={() => {
                    mainStore.deleteWorkExperience(editableId);
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
          title: 'Опыт работы',
        }}
        onAdd={async (form) => {
          if (editableId) {
            await mainStore.putWorkExperience({
              ...form.getState().values,
              portfolioId: parseInt(id!),
              id: editableId,
            });
          } else {
            await mainStore.postWorkExperience({
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
            name: 'description',
            type: 'textarea',
            caption: 'Описание',
            required: true,
          },
          {
            name: 'startDate',
            type: 'text',
            caption: 'Дата начала',
            required: true,
            validator: (value) => {
              return /[0-9]/.test(value) ? '' : 'Введите число';
            },
          },
        ]}
      />
      <div className={'flex flex-wrap gap-10'}>
        {mainStore.workExps.map((workExp) => (
          <Item
            text={workExp.startDate}
            key={workExp.id}
            onClick={() => {
              setEditableId(workExp.id);
              setInitialValues({
                description: workExp.description,
                startDate: workExp.startDate,
              });
              setVisibleDialog(true);
            }}
          />
        ))}
        <Item
          text={'+'}
          onClick={() => {
            setEditableId(null);
            setInitialValues({
              description: '',
              startDate: '',
            });
            setVisibleDialog(true);
          }}
        />
      </div>
    </div>
  );
};

const connected = observer(WorkExperience);
export { connected as WorkExperience };
