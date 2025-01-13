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
import { IEducation, IPostEducation } from '../../api/api.ts';

const defaultVal: IPostEducation = {
  degree: '',
  endYear: 0,
  name: '',
  portfolioId: 0,
  fieldOfStudy: '',
  institution: '',
  startYear: 0,
};

const Educations: FC = () => {
  const breadcrumbs = useBreadcrumbs([
    { text: 'Образование', action: () => null },
  ]);
  const { id } = useParams();
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [initialValues, setInitialValues] = useState(defaultVal);
  const [editableId, setEditableId] = useState<number | null>(null);
  const { add } = useToaster();
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
      <DFDialog<IEducation>
        visible={visibleDialog}
        footerProps={{
          propsButtonApply: {
            loading: mainStore.isLoading === 'SubmitEducation',
          },
          textApply: editableId ? 'Изменить' : 'Добавить',
          textCancel: 'Отменить',
          content: (
            <div className={'flex flex-col gap-2'}>
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
          title: 'Образование',
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
          if (
            form.getState().values.startYear > form.getState().values.endYear
          ) {
            add({
              title: 'Год начала должен быть меньше года окончания',
              name: 'validate',
            });
            return Promise.reject();
          }
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
        validate={(values) => {
          const generalErrs: Partial<
            Record<keyof typeof values, string | undefined>
          > = {};

          if (values.startYear <= values.endYear) {
            generalErrs.startYear =
              'Год начала должен быть меньше года окончания';
          } else {
            return undefined;
          }
        }}
        initialValues={initialValues}
        onClose={() => setVisibleDialog(false)}
        fields={[
          {
            name: 'name',
            type: 'text',
            caption: 'Название',
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
            caption: 'область исследования',
            required: true,
          },
          {
            name: 'startYear',
            type: 'text',
            caption: 'Год начала',
            required: true,
            validator: (value) => {
              return /[0-9]/.test(value) ? '' : 'Введите число';
            },
          },
          {
            name: 'endYear',
            type: 'text',
            caption: 'Год окончания',
            required: true,
            validator: (value) => {
              return /[0-9]/.test(value) ? '' : 'Введите число';
            },
          },
        ]}
      />
      <div className={'flex flex-wrap gap-10'}>
        {mainStore.educations.map((edu) => (
          <Item
            text={edu.startYear.toString()}
            key={edu.id}
            onClick={() => {
              setEditableId(edu.id);
              setInitialValues(edu);
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

const connected = observer(Educations);
export { connected as Educations };
