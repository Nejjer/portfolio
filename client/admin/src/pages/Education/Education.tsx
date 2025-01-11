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
  name: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: number;
  endYear: number;
}

const defaultFormValues: FormValues = {
  degree: '',
  endYear: 0,
  fieldOfStudy: '',
  name: '',
  institution: '',
  startYear: 0,
};

const Education: FC = () => {
  const breadcrumbs = useBreadcrumbs([
    { text: 'Образование', action: () => null },
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
    mainStore.updateEducations();
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
      <h2 className={'mb-10 mt-10 text-2xl'}>Образование</h2>
      <DFDialog<FormValues>
        visible={visibleDialog}
        footerProps={{
          propsButtonApply: {
            loading: mainStore.isLoading === 'SubmitEducation',
          },
          textApply: editableId ? 'Изменить' : 'Добавить',
          textCancel: 'Отменить',
          content: (
            <div>
              {editableId && (
                <Button
                  loading={mainStore.isLoading === 'SubmitEducation'}
                  view={'outlined-danger'}
                  onClick={() => {
                    mainStore.deleteEducation(editableId);
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
            await mainStore.putEducation({
              ...form.getState().values,
              portfolioId: parseInt(id!),
              id: editableId,
            });
          } else {
            await mainStore.postEducation({
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
            name: 'name',
            type: 'text',
            caption: 'Заголовок',
            required: true,
          },
          {
            name: 'institution',
            type: 'text',
            caption: 'Учреждение',
            required: true,
          },
          {
            name: 'degree',
            type: 'text',
            caption: 'Степень',
            required: true,
          },
          {
            name: 'fieldOfStudy',
            type: 'text',
            caption: 'Область',
            required: true,
          },
          {
            name: 'startYear',
            type: 'text',
            caption: 'Дата начала',
            required: true,
            validator: (value) => {
              return /[0-9]/.test(value) ? '' : 'Введите число';
            },
          },
          {
            name: 'endYear',
            type: 'text',
            caption: 'Дата конца',
            required: true,
            validator: (value) => {
              return /[0-9]/.test(value) ? '' : 'Введите число';
            },
          },
        ]}
      />
      <div className={'flex flex-wrap gap-10'}>
        {mainStore.educations.map((education) => (
          <Item
            text={education.name.toString()}
            key={education.id}
            onClick={() => {
              setEditableId(education.id);
              setInitialValues({
                ...education,
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

const connected = observer(Education);
export { connected as Education };
